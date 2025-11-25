
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import TradingViewWidget from "@/components/TradingViewWIdgets";
import { Plus, TrendingUp } from "lucide-react";
import { 
  MARKET_OVERVIEW_WIDGET_CONFIG_SYMBOL,
  TIMELINE_WIDGET_CONFIG, 
  TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function WatchlistPage() {
  const session = await (await auth).api.getSession({
    headers: await headers()
  });

  // Use session to determine if user is logged in
  const isLoggedIn = !!session?.user?.email;
  const userEmail = session?.user?.email;

  const watchlistSymbols = isLoggedIn 
    ? await getWatchlistSymbolsByEmail(userEmail)
    : [];
  
  const hasSymbols = watchlistSymbols.length > 0;

  // Fallback: Show tech giants if watchlist is empty
  const displaySymbols = hasSymbols 
    ? watchlistSymbols 
    : ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "GOOGL", "META", "AMD"];

  const tabTitle = hasSymbols ? "My Portfolio" : "Market Movers (Demo)";
  const primarySymbol = displaySymbols[0];

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 dark:bg-gray-900 ">

      <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        {/* SECTION 2: Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl border border-gray-800 shadow-2xl">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-100 tracking-tight flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  Market Dashboard
                </h1>
                <p className="text-gray-700 dark:text-neutral-200 mt-2 text-lg">
                  {hasSymbols 
                    ? `Tracking ${watchlistSymbols.length} assets in your portfolio` 
                    : "Your watchlist is empty. Showing trending market movers."}
                </p>
              </div>
              {!hasSymbols && (
                <div className="flex items-center gap-3 text-sm text-blue-300 bg-blue-500/10 px-5 py-3 rounded-xl border border-blue-500/20 animate-pulse">
                  <Plus className="w-5 h-5" />
                  <span>Press <kbd className="mx-1 font-mono bg-gray-800 px-2 py-1 rounded text-white border border-gray-700">Search</kbd> to add Markets to your watchlist</span>
                </div>
              )}
            </div>
        {/* SECTION 3: Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column: Market Overview (2/3 width) */}
            <div className="xl:col-span-2 flex flex-col gap-6">
                <div className="bg-transparent  rounded-2xl  overflow-hidden p-1">
                    <h1 className="text-2xl px-1 py-2 font-bold">Your Followed Markets</h1>
                    <TradingViewWidget
                        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                        config={MARKET_OVERVIEW_WIDGET_CONFIG_SYMBOL(displaySymbols, tabTitle)}
                        height={600}
                    />
                </div>
            </div>
            {/* Right Column: News & Context (1/3 width) */}
            <div className="h-full flex flex-col gap-6">
                <TradingViewWidget 
                  scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
                  config={TOP_STORIES_WIDGET_CONFIG}
                  height={600}
                />
                {/* Mini chart Overview for primary symbol */}
                <TradingViewWidget 
                    scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
                    config={MARKET_OVERVIEW_WIDGET_CONFIG_SYMBOL([primarySymbol], `${primarySymbol} Overview`)}
                    height={250}
                    className="max-h-[270px] "
                />
            </div>
        </div>
      </div>
    </div>
  );
}