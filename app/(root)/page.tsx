'use client';

import TradingViewWIdgets from "@/components/TradingViewWIdgets"
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants"
import Link from "next/link";
import { BarChart3, Bell, Lock, Smartphone, Target, TrendingUp } from "lucide-react";


const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`
    
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative section-wrapper text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="badge-glow animate-fade-in">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Live Market Data
            </span>
          </div>
          
          {/* Hero Title */}
          <h1 className="hero-title animate-fade-in-up">
            Your Gateway to
            <br />
            <span className="relative">
              Smart Trading
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C20 3 40 1 70 2C100 3 130 5 160 4C175 3.5 190 2 198 2" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#A855F7"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          
          {/* Hero Subtitle */}
          <p className="hero-subtitle max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Monitor real-time market data, analyze trends with advanced charts, and make informed investment decisions—all in one powerful platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Link href="/sign-up">
              <button className="blue-btn px-8 h-14 text-lg">
                Start Trading Free
                <svg className="ml-2 w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="h-14 px-8 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Watch Demo
                <svg className="ml-2 w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">$2B+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Volume Tracked</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview Card */}
          <div className="glass-card hover-lift p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Market Overview</h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">Live</span>
            </div>
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              className="custom-chart rounded-xl overflow-hidden"
              height={600}
            />
          </div>
          
          {/* Stock Heatmap Card */}
          <div className="lg:col-span-2 glass-card hover-lift p-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stock Heatmap</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">S&P 500</span>
              </div>
            </div>
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              className="custom-chart rounded-xl overflow-hidden"
              height={600}
            />
          </div>
        </div>
      </section>
      
      {/* News and Quotes Section */}
      <section className="section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market News */}
          <div className="glass-card hover-lift p-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Top Stories</h3>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              height={600}
            />
          </div>
          
          {/* Market Quotes */}
          <div className="md:col-span-2 glass-card hover-lift p-6 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Quotes</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold">View All →</button>
            </div>
            <TradingViewWIdgets 
              scriptUrl={`${scriptUrl}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-wrapper">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Everything You Need to Trade Smarter
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed for both beginners and professional traders
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-Time Data</h3>
            <p className="text-gray-600 dark:text-gray-400">Access live market data and charts updated every second</p>
          </div>
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Watchlists</h3>
            <p className="text-gray-600 dark:text-gray-400">Track your favorite stocks and get instant alerts</p>
          </div>
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">Powerful tools to analyze trends and patterns</p>
          </div>
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Price Alerts</h3>
            <p className="text-gray-600 dark:text-gray-400">Set custom alerts and never miss an opportunity</p>
          </div>
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile Ready</h3>
            <p className="text-gray-600 dark:text-gray-400">Trade on the go with our responsive design</p>
          </div>
          <div className="glass-card hover-lift p-8 text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400">Bank-level security to protect your data</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;