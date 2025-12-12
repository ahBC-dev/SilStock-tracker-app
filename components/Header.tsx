

import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
import UserDropDown from "./UserDropDown";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button for sign-in
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import ThemeToggle from "./ThemeToggle";
import { TICKER_TAPE_WIDGET_CONFIG, TICKER_TAPE_WIDGET_CONFIG_LIGHT } from "@/lib/constants";

import TradingViewWidget from "./TradingViewWIdgets";

const Header = async ({ user }: { user: User | undefined }) => {
  // 1. Get the standard list of stocks
  const initialStocks = await searchStocks()

  // 2. Get user's watchlist ONLY if user exists
  let mergedStocks = initialStocks;
  
  if (user?.email) {
      const savedSymbols = await getWatchlistSymbolsByEmail(user.email);
      const savedSet = new Set(savedSymbols.map(s => s.toUpperCase()));
      
      // 3. Merge watchlist status into initial stocks
      mergedStocks = initialStocks.map(stock => ({
        ...stock,
        isInWatchlist: savedSet.has(stock.symbol.toUpperCase()),
      }));
  }

  // 5. Extract symbols for the ticker tape widget
  const displaySymbols = mergedStocks.map(stock => stock.symbol)

  return (
    <header className="sticky top-0 left-0 z-50 w-full">
      {/* Main Header */}
      <div className="bg-white/70 dark:bg-[#0A0A0F]/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-black/5">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 h-20 flex flex-row justify-between items-center text-gray-800 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:bg-blue-500/30 transition-all"></div>
                  <Image src="/assets/icons/logoo.png" alt="Header" width={40} height={40} className="cursor-pointer hidden dark:block relative transition-transform group-hover:scale-110"/>
                  <Image src="/assets/icons/colored-logog.png" alt="Header" width={40} height={40} className="cursor-pointer block dark:hidden relative transition-transform group-hover:scale-110"/>
                </div>
                <span className="hidden md:block text-xl font-black text-gray-900 dark:text-white">Silversed</span>
            </Link>
          </div>
          {/*NavItems*/}
          <nav className="hidden sm:block">
              <Navitems initialStocks={mergedStocks} userEmail={user?.email} />
          </nav>
          {/*userDropDown*/}
          <div className="flex flex-row items-center gap-2">
            {/* sign-in button for guests, conditional rendering */}
            {user ? (
              <UserDropDown user={user} initialStocks={mergedStocks} />
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="blue-btn px-6">Get Started</Button>
                </Link>
              </div>
            )}
            {/* conditional rendering end */}

            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Ticker Tape */}
      <div className="w-full bg-gray-50 dark:bg-gray-950/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 hidden dark:block">
        <TradingViewWidget 
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
          config={TICKER_TAPE_WIDGET_CONFIG}
          height={46}
          className="w-full"
        />
      </div>
      <div className="w-full bg-gray-50 dark:bg-gray-950/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 dark:hidden">
        <TradingViewWidget 
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
          config={TICKER_TAPE_WIDGET_CONFIG_LIGHT}
          height={46}
          className="w-full"
        />
      </div>
    </header>
  )
}

export default Header