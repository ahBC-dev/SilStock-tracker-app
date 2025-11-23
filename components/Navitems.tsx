'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import SearchCommand from './SearchCommand'
import { Search } from 'lucide-react'

const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/alerts', label: 'Alerts' },
    { href: '/search', label: 'Search' },
]

const Navitems = ({initialStocks}: {initialStocks: StockWithWatchlistStatus[]}) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({href, label}) => {
                if (label === 'Search') {
                    return (
                        <li key={href} className='flex flex-row gap-1 '>
                            <SearchCommand 
                            renderAs="text" 
                            label={label}
                            initialStocks={initialStocks}
                            />
                        </li>
                    )
                }

                return (
                    <li key={href}>
                        <Link 
                            href={href}
                            className={isActive(href) ? 'text-blue-500' : 'hover:text-blue-500 transition-colors'}
                        >
                            {label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Navitems