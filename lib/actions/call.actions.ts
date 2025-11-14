'use server';

import { auth } from "../better-auth/auth";
import { inngest } from "../Inngest/client";
import { headers } from "next/headers";

// ---------------- Sign Up ----------------
export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry}: SignUpFormData) => {
    console.log('🔐 === AUTHENTICATION FLOW STARTED ===');
    console.log('📝 User Data:', { email, fullName, country });
    
    try {
        console.log('🔄 Initializing BetterAuth...');
        const authInstance = await auth;
        const headersList = await headers();
        
        console.log('📤 Calling BetterAuth API...');
        const response = await authInstance.api.signUpEmail({
            body: {email, password, name: fullName},
            headers: headersList,
        })

        console.log('✅ BetterAuth Response Received');
        console.log('📊 Response Data:', response);

        if(response) {
            console.log('🚀 Triggering background processes...');
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    password,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                    // Removed password for security
                }
            })
            console.log('📨 Inngest event sent successfully');
        }

        console.log('🎉 USER CREATION COMPLETED SUCCESSFULLY');
        return { success: true, data: response }
        
    } catch (error) {
        console.log('❌ AUTHENTICATION FAILED:', error);
        console.log('💡 Error Details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        
        return {
            success: false,
            message: 'Sign up failed. Please try later.',
        }
    }
}

// ---------------- Sign In ----------------
export const signInWithEmail = async ({email, password,}: SignInFormData) => {
    console.log('🔐 === Sign in AUTHENTICATION FLOW STARTED ===');
    try {
        const response = await (await auth).api.signInEmail({body: {email, password} })

        console.log('🎉 USER Sign-in COMPLETED SUCCESSFULLY');
        return { success: true, data: response }
    } catch (error) {
        console.log('Sign-in failed. Please try later.', error);
        return {success: false, message: 'Sign in failed. Please try later.',}
    }
}

// ---------------- Sign Out ----------------
export const signOut = async () => {
    try {
        await (await auth).api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('❌ SIGN OUT FAILED:', e);
        return {
            success: false,
            message: 'Sign out failed.',
        }
    }
}