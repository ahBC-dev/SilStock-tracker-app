import Header from "@/components/Header"
import { auth } from "@/lib/better-auth/auth"
import { redirect } from "next/navigation";
import { headers } from "next/headers"

const Layout = async ({children}: {children: React.ReactNode}) => {
  const session = await (await auth).api.getSession({ headers: await headers() });

  //update user object to be undefined if no session
  const user = session?.user ? {
    id: session.user.id,
    name: session?.user?.name,
    email: session.user.email,
  }: undefined;

  return (
    <main className="min-h-screen text-gray-900 dark:text-white bg-white dark:bg-[#0A0A0F]">
        <Header user={user} />
        <div className="relative">
          {/* Subtle gradient overlay */}
          <div className="fixed inset-0 bg-linear-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 pointer-events-none"></div>
          
          <div className="relative">
            {children}
          </div>
        </div>
    </main>
  )
}

export default Layout;