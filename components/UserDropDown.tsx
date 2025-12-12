'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Navitems from "./Navitems";
import { signOut } from "@/lib/actions/call.actions";
import ThemeToggle from "./ThemeToggle";

const UserDropDown = ({ user, initialStocks }: { user: User, initialStocks: StockWithWatchlistStatus[] }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-blue-900 cursor-pointer p-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.image || "https://github.com/shadcn.png"}></AvatarImage>
                        <AvatarFallback className="bg-white text-black text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-base font-medium text-gray-800 dark:text-neutral-300">
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            {/*for when the user click their avat the dropdown appears along with the stuff ⬇️*/}
            <DropdownMenuContent className="text-gray-400">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image || "https://github.com/shadcn.png"}></AvatarImage>
                            <AvatarFallback className="bg-blue-500 text-yellow-400 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-800 dark:text-neutral-200">
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-neutral-400">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                {/*nav items for small screen devices*/}
                <nav className="sm:hidden">
                    <Navitems initialStocks={initialStocks} userEmail={user?.email} />
                </nav>
                <DropdownMenuSeparator className="bg-gray-600"/>
                    <DropdownMenuItem onClick={handleSignOut}  className="text-gray-800 dark:text-neutral-100 text-md font-medium focus:bg-transparent focus:text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 dark:focus:text-blue-500 transition-colors cursor-pointer ">
                        <LogOut className="text-2xl " />
                        Logout
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropDown