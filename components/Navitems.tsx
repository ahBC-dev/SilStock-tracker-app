'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import SearchCommand from './SearchCommand'
import { LayoutDashboard, Star, Search as SearchIcon } from "lucide-react";


const NAV_ITEMS = [
    { href: '/', label: 'Dashboard', Icon: LayoutDashboard },
    { href: '/watchlist/${symbol}', label: 'Watchlist', Icon: Star },
    { href: '/search', label: 'Search', Icon: SearchIcon },
]

const Navitems = ({initialStocks, userEmail}: {initialStocks: StockWithWatchlistStatus[], userEmail?: string}) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col md:flex-row p-2 md:gap-2 lg:gap-4 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({href, label, Icon}) => {
                //HIDE WATCHLIST IF NO USER
                if (label === 'Watchlist' && !userEmail) {
                    return null;
                }
                
                if (label === 'Search') {
                    return (
                        <li key={href} className='flex flex-row gap-1 '>
                            <SearchCommand 
                            renderAs="text" 
                            label={label}
                            initialStocks={initialStocks}
                            userEmail={userEmail}
                            />
                        </li>
                    )
                }

                const active = isActive(href);

                return (
                    <li key={href}>
                        <Link 
                            href={href}
                            className={`
                                group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm
                                ${active
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                }
                            `}
                        >
                            {Icon && <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? '' : 'group-hover:rotate-12'}`} />}
                            <span>{label}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Navitems