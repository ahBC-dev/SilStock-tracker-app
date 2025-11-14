import Link from "next/link"
import Image from "next/image"

import { redirect } from "next/dist/client/components/redirect";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";



const Layout = async ({children}: {children: React.ReactNode}) => {
  const session = await (await auth).api.getSession({ headers: await headers() });

  if(session?.user) redirect('/');
  
  return (
    <main className="auth-layout">
        <section className="auth-left-section scrollbar-hide-default">
          <Link href="/" className="auth-logo">
            <Image src="/assets/icons/logo.svg" alt="silversed logo" height={140} width={140}/>
          </Link>

          <div className="pb-6 lg:pb-8 flex-1">
            {children}
          </div>
        </section>
        <section className="auth-right-section">
          <div className="z-10 relative lg:ml-4 lg:mb-16">
            <blockquote className="auth-blockquote">
                Silversed completely transformed the way I follow the markets. What used to feel overwhelming now feels effortless. I can monitor my portfolio, analyze trends, and make informed decisions all in one place.
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <cite className="auth-testimonial-author">- Seddiq S.</cite>
                <p className="max-md:text-xs text-neutral-200">Project investor</p>
              </div>
              <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image src="assets/icons/star.svg" alt="Star" key={star} width={20} height={20}/>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 relative rounded-xl ">
            <Image src="/assets/images/dashboard.png" alt="dashboardimage" width={1440} height={1150} className="auth-dashboard-preview absolute top-0"/>
          </div>
        </section>
    </main>
  )
}

export default Layout