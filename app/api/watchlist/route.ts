import { NextRequest, NextResponse } from 'next/server'
import { getWatchlistSymbolsByEmail, mutateWatchlist } from '@/lib/actions/watchlist.actions'

export async function POST(req: NextRequest) {
  const { action, email, symbol, company } = await req.json() as {
    action: 'add' | 'remove'
    email: string
    symbol: string
    company?: string
  }
  const result = await mutateWatchlist(action, email, symbol, company)
  const status = result.ok ? 200 : 400
  return NextResponse.json(result, { status })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email') || ''
  const symbols = await getWatchlistSymbolsByEmail(email)
  return NextResponse.json({ ok: true, symbols })
}