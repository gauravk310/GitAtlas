'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGithub, FaSignOutAlt, FaChartBar, FaCodeBranch, FaUsers } from 'react-icons/fa';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user) {
            fetchRepositories();
        }
    }, [session]);

    const fetchRepositories = async () => {
        try {
            setLoading(true);
            console.log('Fetching repositories...');
            const response = await fetch('/api/repositories');
            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Repositories fetched:', data.length, 'repos');
                setRepositories(data);
            } else {
                const errorData = await response.json();
                console.error('Failed to fetch repositories:', errorData);
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                                <FaGithub className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Atlas</span>
                                </h1>
                                <p className="text-sm text-gray-400">GitHub Analytics Platform</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={session.user?.image || ''}
                                    alt={session.user?.name || ''}
                                    className="w-10 h-10 rounded-full border-2 border-purple-500"
                                />
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-white">{session.user?.name}</p>
                                    <p className="text-xs text-gray-400">{session.user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                <FaSignOutAlt />
                                <span className="hidden md:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={<FaGithub className="w-8 h-8" />}
                        title="Total Repositories"
                        value={repositories.length}
                        color="from-purple-600 to-blue-600"
                    />
                    <StatCard
                        icon={<FaCodeBranch className="w-8 h-8" />}
                        title="Active Branches"
                        value="--"
                        color="from-blue-600 to-cyan-600"
                    />
                    <StatCard
                        icon={<FaUsers className="w-8 h-8" />}
                        title="Contributors"
                        value="--"
                        color="from-cyan-600 to-teal-600"
                    />
                </div>

                {/* Repositories Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FaChartBar className="text-purple-400" />
                            Your Repositories
                        </h2>
                        <button
                            onClick={fetchRepositories}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                            <p className="text-gray-400 mt-4">Loading repositories...</p>
                        </div>
                    ) : repositories.length === 0 ? (
                        <div className="text-center py-12">
                            <FaGithub className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No repositories found</p>
                            <p className="text-gray-500 text-sm mt-2">
                                Your GitHub repositories will appear here once synced
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {repositories.map((repo: any) => (
                                <RepositoryCard key={repo.id} repository={repo} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, title, value, color }: any) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-r ${color} p-3 rounded-lg`}>
                    {icon}
                </div>
                <div>
                    <p className="text-gray-400 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}

function RepositoryCard({ repository }: any) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
            <h3 className="text-lg font-semibold text-white mb-2 truncate">
                {repository.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {repository.description || 'No description available'}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
                {repository.language && (
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        {repository.language}
                    </span>
                )}
                <span>⭐ {repository.stargazers_count || 0}</span>
                <span>🍴 {repository.forks_count || 0}</span>
            </div>
        </div>
    );
}
