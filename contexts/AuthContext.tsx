import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { authApi } from '@/lib/auth-api';

type AuthContextType = {
    userToken: string | null;
    isLoading: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
    userToken: null,
    isLoading: true,
    signIn: () => { },
    signOut: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        // Check for initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';
        const inPublicRoute = segments[0] === 'sign-in' || segments[0] === 'verify-code' || segments[0] === 'welcome';

        if (!session && !inPublicRoute) {
            // Redirect to the sign-in page if not signed in and not on a public page
            router.replace('/sign-in');
        } else if (session && inPublicRoute) {
            // Redirect to home if signed in and trying to access public pages
            router.replace('/');
        }
    }, [session, segments, isLoading]);

    const signIn = async (token: string) => {
        // Deprecated: Supabase handles session automatically
        console.warn('signIn called manually, but Supabase handles this via onAuthStateChange');
    };

    const signOut = async () => {
        await authApi.logout();
    };

    return (
        <AuthContext.Provider value={{ userToken: session?.access_token || null, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
