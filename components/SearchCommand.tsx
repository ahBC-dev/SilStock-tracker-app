"use client"

import { useEffect, useRef, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";

import {Loader2,  Search,  Star,  TrendingUp} from "lucide-react";

import Link from "next/link";
import {searchStocks} from "@/lib/actions/finnhub.actions";

import useDebounce from "@/hooks/useDebounce";
import WatchlistButton from "./WatchlistButton";
import { BsSearch } from "react-icons/bs";

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks, userEmail }: SearchCommandProps & { userEmail?: string, initialStocks: StockWithWatchlistStatus[] }) {

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

  // Store user's watchlist symbols to apply to search results
  const watchlistSetRef = useRef<Set<string>>(new Set(initialStocks.filter(s => s.isInWatchlist).map(s => s.symbol)))


  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);


  // Fetch fresh watchlist data when opening to ensure sync
  useEffect(() => {
    if (open && userEmail) {
      fetch(`/api/watchlist?email=${userEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data.symbols) {
            const newSet = new Set<string>(data.symbols);
            watchlistSetRef.current = newSet;
            // Update current view
            setStocks(prev => prev.map(s => ({
              ...s,
              isInWatchlist: newSet.has(s.symbol)
            })));
          }
        })
        .catch(err => console.error(err));
    }
  }, [open, userEmail]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSearch = async () => {
    if(!isSearchMode) return setStocks(initialStocks);

    setLoading(true)
    try {
        const results = await searchStocks(searchTerm.trim());
        // Apply watchlist status from the current watchlist set
        const mergedResults = results.map(stock => ({
          ...stock,
          isInWatchlist: watchlistSetRef.current.has(stock.symbol)
        }));
        setStocks(mergedResults);
    } catch {
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  }

    // new: shared handler for watchlist changes (both icon and full button use this)
    const toggleWatchlist = async (e: React.MouseEvent, stock: StockWithWatchlistStatus) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userEmail) return;

    const next = !stock.isInWatchlist;
    // Update local state
    setStocks(prev => prev.map(s => s.symbol === stock.symbol ? { ...s, isInWatchlist: next } : s));
    // Update ref for future searches
    if (next) {
      watchlistSetRef.current.add(stock.symbol);
    } else {
      watchlistSetRef.current.delete(stock.symbol);
    }

    try {
      await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: next ? 'add' : 'remove',
          email: userEmail,
          symbol: stock.symbol,
          company: stock.name,
        }),
      });
    } catch {
      // Revert state on error
      setStocks(prev => prev.map(s => s.symbol === stock.symbol ? { ...s, isInWatchlist: !next } : s));
      if (!next) watchlistSetRef.current.add(stock.symbol);
      else watchlistSetRef.current.delete(stock.symbol);
    }
  };

  return (
    <>
      {renderAs === 'text' ? (
          <span onClick={() => setOpen(true)} className="search-text">
            <BsSearch size={24} className="inline-block mr-1 transition-colors " />
            {label}
          </span>
        ) : (
          <Button onClick={() => setOpen(true)} className="search-btn">
            <BsSearch size={22} className="inline-block mr-1 transition-colors " />
            {label}
          </Button>
        )}
      <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
        <div className="search-field">
          <CommandInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search stocks..." className="search-input" />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
              <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
              <div className="search-list-indicator">
                {isSearchMode ? 'No results found' : 'No stocks available'}
              </div>
            ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock, i) => (
                  <li key={stock.symbol} className="search-item">
                    <Link
                        href={`/stocks/${stock.symbol}`}
                        onClick={handleSelectStock}
                        className="search-item-link"
                    >
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <div  className="flex-1">
                        <div className="search-item-name">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.symbol} | {stock.exchange } | {stock.type}
                        </div>
                      </div>

                        {/*<Star />*/}
                        <Star
                            onClick={(e) => toggleWatchlist(e, stock)}
                            className="h-4 w-4 text-yellow-400"
                            fill={stock.isInWatchlist ? "yellow" : "none"}
                        />
                    </Link>
                  </li>
              ))}
            </ul>
          )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}