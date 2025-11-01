import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
import UserDropDown from "./UserDropDown";

const Header = () => {
  return (
    <header className="sticky top-0 header">
        <div className="container header-wrapper">
            <Link href="/">
                <Image src="/public/assets/icons/logo.svg" alt="shithole" width={140} height={160} className="cusorsor-pointer h-8 w-auto"/>
            </Link>
            {/*NavItems*/}
            <nav className="hidden sm:block">
                <Navitems />
            </nav>
            {/*userDropDown*/}
            <UserDropDown />
        </div>
    </header>
  )
}

export default Header