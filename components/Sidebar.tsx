'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiHome,
  FiBell,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import SearchCommand from './SearchCommand';
import Image from 'next/image';

const Sidebar = ({ initialStocks, userEmail, user }: { 
  initialStocks: StockWithWatchlistStatus[], 
  userEmail?: string,
  user?: User 
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: '/', label: 'Home', Icon: FiHome },
    { href: '/watchlist', label: 'Watchlist', Icon: FiStar },
    { href: '/alerts', label: 'Alerts', Icon: FiBell },
    { href: '/search', label: 'Search', Icon: FiSearch },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-neutral-300 bg-zinc-900 p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      {/* Logo/Top Section */}
      <div className="mb-3 border-b border-neutral-300 pb-3">
        <Link href="/" className="flex cursor-pointer items-center justify-center rounded-md transition-colors ">
          <div className="flex items-center justify-center">
            <Image 
                  src="/assets/icons/favicon.ico"
                  alt="Your Logo Text"
                  width={50}
                  height={50}
                  className={`${open && 'hidden'}`}
                />
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                
                <Image 
              src="/assets/images/logo.png"
              alt="Your Logo"
              width={150}
              height={50}

            />
              </motion.div>
            )}
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="space-y-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          if (label === 'Search') {
            return (
              <SearchOption
                key={href}
                Icon={Icon}
                title={label}
                open={open}
                initialStocks={initialStocks}
                userEmail={userEmail}
              />
            );
          }

          return (
            <Option
              key={href}
              Icon={Icon}
              title={label}
              href={href}
              active={isActive(href)}
              open={open}
            />
          );
        })}
      </div>

      {/* User Section */}
      {user && open && (
        <div className="mt-4 border-t border-slate-300 pt-4">
          <UserSection user={user} />
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, href, active, open }) => {
  return (
    <Link href={href}>
      <motion.div
        layout
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${active ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

const SearchOption = ({ Icon, title, open, initialStocks, userEmail }) => {
  return (
    <motion.div
      layout
      className="relative flex h-10 w-full items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100"
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="flex-1 text-left"
        >
          <SearchCommand 
            renderAs="text" 
            label={title}
            initialStocks={initialStocks}
            userEmail={userEmail}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <span className="text-white font-bold text-sm">LOGO</span>
    </motion.div>
  );
};

const UserSection = ({ user }) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center">
        <span className="text-xs font-medium">
          {user.email?.charAt(0).toUpperCase()}
        </span>
      </div>
      <div>
        <span className="block text-xs font-medium">{user.email}</span>
        <span className="block text-xs text-slate-500">User</span>
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;