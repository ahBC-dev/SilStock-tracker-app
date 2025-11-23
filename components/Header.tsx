import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
import UserDropDown from "./UserDropDown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User}) => {
  const initialStocks = await searchStocks()

  return (
    <header className="sticky top-0 header">
        <div className="container header-wrapper">
            <Link href="/">
                <Image src="/assets/icons/logo.png" alt="Header" width={140} height={160} className="cursor-pointer h-8 w-auto"/>
            </Link>
            {/*NavItems*/}
            <nav className="hidden sm:block">
                <Navitems initialStocks={initialStocks} />
            </nav>
            {/*userDropDown*/}
            <UserDropDown user={user} initialStocks={initialStocks} />
        </div>
    </header>
  )
}

export default Header