'use client'

import FooterLink from "@/components/form/FooterLink"
import InputField from "@/components/form/InputField"
import { Button } from "@/components/ui/button"
import { signInWithEmail } from "@/lib/actions/call.actions"
import { signInWithGoogle } from "@/lib/better-auth/client"
import { ArrowRight, Loader2, Sparkles } from "lucide-react"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SignInPage = () => {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: SignInFormData) => {
      try {
        const result = await signInWithEmail(data);
        if(result.success) {router.push('/')} 
      } catch (e) {
        console.log(e)
        toast.error('Sign In failed', {
          description: e instanceof Error ? e.message : 'Failed to Sign in'
        })
      }
    }
  

  return (
    <div className="w-full animate-fade-in-up">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="form-title">Welcome Back!</h1>
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <p className="form-subtitle">Sign in to continue your trading journey</p>
      </div>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-14 mb-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-base transition-all hover:border-gray-300 dark:hover:border-gray-600"
        onClick={signInWithGoogle}
      >
        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-[#0A0A0F] text-gray-500 dark:text-gray-400 font-medium">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* The inputs*/}
        <InputField 
          name="email"
          label="Email Address"
          placeholder="aahg@ahmadaljaziri.com"
          register={register}
          error={errors.email}
          validation={{ required: "Email is required", 
                        pattern: {
                          value: /^\w+@\w+\.\w+$/,
                          message: 'Please enter a valid email address'
                        }}}
        />
        <InputField 
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required" }}
        />

        <Button type="submit" disabled={isSubmitting} className="blue-btn w-full mt-8 h-14 text-base">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Sign In
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up"/>
      </div>
    </div>
  )
}

export default SignInPage