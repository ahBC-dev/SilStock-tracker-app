'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import SearchCommand from './SearchCommand'

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { PiListStar } from "react-icons/pi";


const NAV_ITEMS = [
    { href: '/', label: 'Dashboard', Icon: RiDashboardHorizontalFill },
    { href: '/watchlist', label: 'Watchlist', Icon: PiListStar },
    //{ href: '/alerts', label: 'Alerts' },
    { href: '/search', label: 'Search', },
]

const Navitems = ({initialStocks, userEmail}: {initialStocks: StockWithWatchlistStatus[], userEmail?: string}) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col md:flex-row p-2 gap-4 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({href, label, Icon}) => {
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

                return (
                    <li key={href}>
                        <Link 
                            href={href}
                            className={isActive(href) ? 'text-blue-500' : 'hover:text-blue-500 transition-colors'}
                        >
                            {Icon && <Icon size={24} className="inline-block mr-2" />}
                            {label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Navitems