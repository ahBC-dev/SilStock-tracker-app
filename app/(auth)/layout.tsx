import Link from "next/link"
import Image from "next/image"

import { redirect } from "next/dist/client/components/redirect";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { Zap, Lock, TrendingUp, Globe } from "lucide-react";



const Layout = async ({children}: {children: React.ReactNode}) => {
  const session = await (await auth).api.getSession({ headers: await headers() });

  if(session?.user) redirect('/');
  
  return (
    <main className="auth-layout">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="auth-container">
        {/* Left Section - Form */}
        <section className="auth-left-section">
          <div className="auth-content">
            {/* Logo */}
            <Link href="/" className="auth-logo group">
              <div className="relative">
                <Image 
                  src="/assets/icons/logo.svg" 
                  alt="silversed logo" 
                  height={50} 
                  width={50}
                  className="transition-transform group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white">Silversed</span>
            </Link>

            {/* Form Content */}
            {children}
            
            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">256-bit</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">SSL Secure</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">GDPR</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Compliant</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section - Visual */}
        <section className="auth-right-section">
          {/* Decorative shapes */}
          <div className="auth-decorative-shapes">
            <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white/10 rounded-lg rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-white/5 rounded-full"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-white max-w-xl space-y-12">
            {/* Quote */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed">
                "This platform transformed how I trade. Real-time data, intuitive interface, and powerful analytics—everything I need in one place."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  S
                </div>
                <div>
                  <div className="font-bold text-lg">Seddiq S.</div>
                  <div className="text-white/80 text-sm">Professional Trader</div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <Zap className="w-10 h-10 mb-3 text-yellow-400" />
                <div className="font-bold mb-1">Lightning Fast</div>
                <div className="text-sm text-white/80">Real-time updates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <Lock className="w-10 h-10 mb-3 text-green-400" />
                <div className="font-bold mb-1">Bank-Level Security</div>
                <div className="text-sm text-white/80">Your data is safe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <TrendingUp className="w-10 h-10 mb-3 text-blue-400" />
                <div className="font-bold mb-1">Advanced Charts</div>
                <div className="text-sm text-white/80">Professional tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <Globe className="w-10 h-10 mb-3 text-purple-400" />
                <div className="font-bold mb-1">Global Markets</div>
                <div className="text-sm text-white/80">Trade worldwide</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Layout