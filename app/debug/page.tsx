'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DebugPage() {
    const { data: session, status } = useSession();
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [apiError, setApiError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testApiCall = async () => {
        setLoading(true);
        setApiError(null);
        setApiResponse(null);

        try {
            const response = await fetch('/api/repositories');
            const data = await response.json();

            if (response.ok) {
                setApiResponse(data);
            } else {
                setApiError(data);
            }
        } catch (error) {
            setApiError({ error: 'Network error', details: String(error) });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            testApiCall();
        }
    }, [session]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Debug Information</h1>

                {/* Session Status */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Session Status</h2>
                    <div className="space-y-2">
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Authenticated:</strong> {session ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                {/* Session Data */}
                {session && (
                    <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Session Data</h2>
                        <pre className="bg-zinc-800 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </div>
                )}

                {/* API Test */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">API Test</h2>
                    <button
                        onClick={testApiCall}
                        disabled={loading || !session}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg mb-4"
                    >
                        {loading ? 'Testing...' : 'Test /api/repositories'}
                    </button>

                    {apiResponse && (
                        <div>
                            <h3 className="font-bold text-emerald-400 mb-2">Success Response:</h3>
                            <p className="mb-2">Found {apiResponse.length} repositories</p>
                            <pre className="bg-zinc-800 p-4 rounded overflow-auto text-sm max-h-96">
                                {JSON.stringify(apiResponse, null, 2)}
                            </pre>
                        </div>
                    )}

                    {apiError && (
                        <div>
                            <h3 className="font-bold text-red-400 mb-2">Error Response:</h3>
                            <pre className="bg-zinc-800 p-4 rounded overflow-auto text-sm">
                                {JSON.stringify(apiError, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="bg-zinc-900 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Troubleshooting Steps</h2>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                        <li>Check if you're authenticated (Session Status should show "authenticated")</li>
                        <li>Verify your session contains user data</li>
                        <li>Test the API endpoint using the button above</li>
                        <li>Check browser console (F12) for any errors</li>
                        <li>Check server terminal for API errors</li>
                        <li>Verify your GitHub OAuth token has the correct scopes (read:user, user:email, repo)</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
