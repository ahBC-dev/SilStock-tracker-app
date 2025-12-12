import { createAuthClient } from "better-auth/react";

// Client-side auth helper for React components
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Helper to sign in with Google OAuth
export const signInWithGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirect to home after successful login
    });
};
