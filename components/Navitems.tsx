'use client'

import { NAV_ITEMS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navitems = () => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';

        return pathname.startsWith(path); //to check wether the link is currently active
    }

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS.map(({href, label}) => (
            <li key={href}>
                <Link href={href} className={`hover:text-blue-500 transition-colors ${
                        isActive(href) ? 'text-gray-200' : ''
                    }`}>
                        {label}
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default Navitems