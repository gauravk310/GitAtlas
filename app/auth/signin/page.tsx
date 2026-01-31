'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
                            <FaGithub className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white text-center mb-2">
                        Welcome to GitAtlas
                    </h1>
                    <p className="text-gray-300 text-center mb-8">
                        Sign in with your GitHub account to continue
                    </p>

                    {/* Sign In Button */}
                    <button
                        onClick={() => signIn('github', { callbackUrl })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black hover:bg-zinc-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg border border-zinc-800"
                    >
                        <FaGithub className="w-6 h-6 text-white" />
                        Sign in with GitHub
                    </button>

                    {/* Info */}
                    <p className="text-gray-400 text-sm text-center mt-6">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}

export const dynamic = 'force-dynamic';
