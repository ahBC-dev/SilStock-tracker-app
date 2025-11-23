import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
import UserDropDown from "./UserDropDown";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";

const Header = async ({ user }: { user: User}) => {
  // 1. Get the standard list of stocks
  const initialStocks = await searchStocks()

  // 2. Get user's watchlist symbols if user is logged in
  const savedSymbols = user?.email ? await getWatchlistSymbolsByEmail(user.email) : []
  const savedSet = new Set(savedSymbols.map(s => s.toUpperCase()))

  // 4. Merge them: check if each stock is in the user's watchlist
  const mergedStocks: StockWithWatchlistStatus[] = initialStocks.map(stock => ({
    ...stock,
    isInWatchlist: savedSet.has(stock.symbol.toUpperCase()),
  }))

  return (
    <header className="sticky top-0 left-0 header">
        <div className="container header-wrapper">
            <Link href="/">
                <Image src="/assets/icons/logo.png" alt="Header" width={140} height={160} className="cursor-pointer h-8 w-auto"/>
            </Link>
            {/*NavItems*/}
            <nav className="hidden sm:block">
                <Navitems initialStocks={mergedStocks} userEmail={user?.email} />
            </nav>
            {/*userDropDown*/}
            <UserDropDown user={user} initialStocks={mergedStocks} />
        </div>
    </header>
  )
}

export default Header