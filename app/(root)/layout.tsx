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
    <main className="min-h-screen text-gray-800 dark:text-neutral-200 bg-neutral-100 dark:bg-gray-900">
        <Header user={user} />
        <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 bg-neutral-100 dark:bg-gray-900 py-20 md:py-17">
            {children}
        </div>
    </main>
  )
}

export default Layout;