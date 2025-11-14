import Header from "@/components/Header"
import { auth } from "@/lib/better-auth/auth"

import { redirect } from "next/navigation";
import { headers } from "next/headers"

const Layout = async ({children}: {children: React.ReactNode}) => {
  const session = await (await auth).api.getSession({ headers: await headers() });

  if(!session?.user) {
    redirect('/sign-in'); // Make sure this is on its own line
  }

  const user = {
    id: session.user.id,
    name: session?.user?.name,
    email: session.user.email,
  }

  return (
    <main className="min-h-screen text-neutral-200">
        <Header user={user} />
        <div className="container py-10">
            {children}
        </div>
    </main>
  )
}

export default Layout