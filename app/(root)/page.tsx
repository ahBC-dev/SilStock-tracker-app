'use client';

import TradingViewWIdgets from "@/components/TradingViewWIdgets"
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants"


const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`
    
  return (
    <div className="flex min-h-screen flex-col gap-4 md:gap-10 items-center sm:items-start">
        <section className="w-full flex flex-col md:flex-row gap-6 md:gap-4 mx-auto justify-center items-center">
          <div className="md:col-span-1 xl:col-span-1 w-full max-w-[360px] md:max-w-[300px] 2xl:max-w-[430px]">
            <TradingViewWIdgets 
              title="Market Overview"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
          <div className="md:col-span-1 xl:col-span-2 w-full md:max-w-[450px] lg:max-w-[640px] xl:max-w-[900px] 2xl:max-w-[1000px]">
            <TradingViewWIdgets 
              title="Stock Heatmap"
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
        </section>
        <section className="grid w-full gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="h-full md:col-span-1 xl:col-span-1">
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              height={600}
            />
          </div>
          <div className="h-full md:col-span-1 xl:col-span-2">
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>
    </div>
  )
}

export default Home;