'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Suspense } from 'react';

function AuthErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const errorMessages: { [key: string]: string } = {
        Configuration: 'There is a problem with the server configuration.',
        AccessDenied: 'You do not have permission to sign in.',
        Verification: 'The verification token has expired or has already been used.',
        Default: 'An error occurred during authentication.',
    };

    const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    {/* Error Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-600 p-4 rounded-full">
                            <FaExclamationTriangle className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white text-center mb-4">
                        Authentication Error
                    </h1>

                    {/* Error Message */}
                    <p className="text-gray-300 text-center mb-8">
                        {errorMessage}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link
                            href="/auth/signin"
                            className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="block w-full text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthError() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        }>
            <AuthErrorContent />
        </Suspense>
    );
}

export const dynamic = 'force-dynamic';
