'use client'

import FooterLink from "@/components/form/FooterLink"
import InputField from "@/components/form/InputField"
import { Button } from "@/components/ui/button"
import { signInWithEmail } from "@/lib/actions/call.actions"

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
    <>
      <h1 className="form-title">Sign In to Your account</h1>

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

        <Button type="submit" disabled={isSubmitting} className="blue-btn w-full mt-5">
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up"/>
      </form>
    </>
  )
}

export default SignInPage