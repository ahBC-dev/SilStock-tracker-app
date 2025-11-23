'use server'; // Marks this module for server-only execution

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

/**
 * Returns an array of upper‑cased watchlist symbols for a user email.
 */
export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return []
  try {
    // Get database connection
    const mongoose = await connectToDatabase()
    const db = mongoose.connection.db
    if (!db) return []

    // 1. Find the user by email
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email })
    if (!user) return []

    const userId = (user.id as string) || String(user._id || '')
    if (!userId) return []

    // 2. Find all watchlist items for this user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = await Watchlist.find({ userId }).select('symbol').lean()
    
    // 3. Return array of symbols in upper-case
    return items.map(i => i.symbol.toUpperCase())
  } catch (e) {
    console.error('getWatchlistSymbolsByEmail error', e)
    return []
  }
}

/**
 * Add or remove a symbol for a user.
 */
export async function mutateWatchlist(action: 'add' | 'remove', email: string, symbol: string, company?: string) {
  if (!action || !email || !symbol) return { ok: false, error: 'Missing fields' }
  try {
    const mongoose = await connectToDatabase()
    const db = mongoose.connection.db
    if (!db) return { ok: false, error: 'DB error' }
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string }>({ email })
    if (!user) return { ok: false, error: 'User not found' }
    const userId = (user.id as string) || String(user._id || '')
    if (!userId) return { ok: false, error: 'User id missing' }

    if (action === 'add') {
      if (!company) return { ok: false, error: 'Company required' }
      await Watchlist.updateOne(
        { userId, symbol: symbol.toUpperCase() },
        { $setOnInsert: { userId, symbol: symbol.toUpperCase(), company: company.trim(), addedAt: new Date() } },
        { upsert: true }
      )
      return { ok: true, status: 'added' }
    } else {
      await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() })
      return { ok: true, status: 'removed' }
    }
  } catch (e) {
    console.error('mutateWatchlist error', e)
    return { ok: false, error: 'Server error' }
  }
}