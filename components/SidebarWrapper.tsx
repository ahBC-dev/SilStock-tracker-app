// components/SidebarWrapper.tsx
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import Sidebar from "./Sidebar";

export default async function SidebarWrapper({ user }: { user: User }) {
  // Your existing data fetching logic from Header.tsx
  const initialStocks = await searchStocks()
  const savedSymbols = user?.email ? await getWatchlistSymbolsByEmail(user.email) : []
  const savedSet = new Set(savedSymbols.map(s => s.toUpperCase()))
  
  const mergedStocks: StockWithWatchlistStatus[] = initialStocks.map(stock => ({
    ...stock,
    isInWatchlist: savedSet.has(stock.symbol.toUpperCase()),
  }))

  return (
    <Sidebar 
      initialStocks={mergedStocks} 
      userEmail={user?.email}
      user={user}
    />
  )
}