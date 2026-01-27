'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCodeBranch, FaUser, FaClock } from 'react-icons/fa';
import { FaGitAlt } from 'react-icons/fa';

interface Branch {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
}

interface Commit {
    sha: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        };
        message: string;
    };
    author: {
        login: string;
        avatar_url: string;
    } | null;
    parents: Array<{ sha: string }>;
}

export default function RepositoryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const owner = params.owner as string;
    const repo = params.repo as string;

    const [repository, setRepository] = useState<any>(null);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'commits' | 'branches'>('branches');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user && owner && repo) {
            fetchRepositoryDetails();
            fetchBranches();
        }
    }, [session, owner, repo]);

    const fetchRepositoryDetails = async () => {
        try {
            const response = await fetch(`/api/repository/${owner}/${repo}`);
            if (response.ok) {
                const data = await response.json();
                setRepository(data);
            }
        } catch (error) {
            console.error('Error fetching repo details:', error);
        }
    };

    useEffect(() => {
        if (selectedBranch) {
            fetchCommits(selectedBranch);
        }
    }, [selectedBranch]);

    const fetchBranches = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/repository/${owner}/${repo}/branches`);

            if (!response.ok) {
                throw new Error('Failed to fetch branches');
            }

            const data = await response.json();
            setBranches(data);

            // Set default branch (usually 'main' or 'master')
            const defaultBranch = data.find((b: Branch) => b.name === 'main' || b.name === 'master') || data[0];
            if (defaultBranch) {
                setSelectedBranch(defaultBranch.name);
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setError('Failed to load branches');
        } finally {
            setLoading(false);
        }
    };

    const fetchCommits = async (branch: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/repository/${owner}/${repo}/commits?branch=${branch}`);

            if (!response.ok) {
                throw new Error('Failed to fetch commits');
            }

            const data = await response.json();
            setCommits(data);
        } catch (error) {
            console.error('Error fetching commits:', error);
            setError('Failed to load commits');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
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
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-black/80 text-white rounded-lg transition-colors border border-white/20 shadow-lg"
                        >
                            <FaArrowLeft />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white">
                                {owner} / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{repo}</span>
                            </h1>
                            {repository && (
                                <div className="flex flex-wrap items-center gap-4 mt-1">
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">⭐ {repository.stargazers_count}</span>
                                        <span className="flex items-center gap-1">🍴 {repository.forks_count}</span>
                                        <span className="flex items-center gap-1">📦 {(repository.size / 1024).toFixed(1)} MB</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex gap-1 mt-6">
                        <TabButton
                            active={activeTab === 'branches'}
                            onClick={() => setActiveTab('branches')}
                            icon={<FaCodeBranch />}
                            label="Branches"
                        />
                        <TabButton
                            active={activeTab === 'commits'}
                            onClick={() => setActiveTab('commits')}
                            icon={<FaClock />}
                            label="Recent Commits"
                        />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 capitalize">
                            {activeTab === 'commits' && <FaClock className="text-purple-400" />}
                            {activeTab === 'branches' && <FaCodeBranch className="text-purple-400" />}
                            {activeTab === 'commits' ? 'Commit List' : 'Repository Branches'}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Viewing {activeTab} for <span className="text-purple-400">{selectedBranch}</span> branch
                        </p>
                    </div>
                    {activeTab !== 'branches' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider ml-1">Select Branch</label>
                            <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 px-4 py-2.5 transition-all group focus-within:ring-2 focus-within:ring-purple-500/40">
                                <FaCodeBranch className="text-purple-400 text-sm group-hover:scale-110 transition-transform" />
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="bg-black text-white text-base font-medium focus:outline-none cursor-pointer min-w-[140px] pr-2"
                                >
                                    {branches.map((b) => (
                                        <option key={b.name} value={b.name} className="bg-black text-white">
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tab Content */}
                <div className="transition-all duration-300">


                    {activeTab === 'commits' && (
                        <div className="bg-black rounded-xl border border-white/10 p-6 shadow-xl">
                            {commits.length > 0 ? (
                                <div className="space-y-3">
                                    {commits.map((commit) => (
                                        <CommitCard key={commit.sha} commit={commit} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No commits found for this branch" />
                            )}
                        </div>
                    )}

                    {activeTab === 'branches' && (
                        <div className="bg-black rounded-xl border border-white/10 p-6 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {branches.map((branch) => (
                                    <button
                                        key={branch.name}
                                        onClick={() => {
                                            setSelectedBranch(branch.name);
                                            setActiveTab('commits');
                                        }}
                                        className={`p-4 rounded-xl border transition-all text-left cursor-pointer ${selectedBranch === branch.name
                                            ? 'bg-black border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-white'
                                            : 'bg-black border-white/10 text-gray-400 hover:border-purple-500/50 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2 text-white">
                                            <span className="font-medium flex items-center gap-2">
                                                <FaCodeBranch className="text-purple-400" />
                                                {branch.name}
                                            </span>
                                            {branch.protected && (
                                                <span className="px-2 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full font-bold uppercase">
                                                    Protected
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 font-mono truncate">{branch.commit.sha}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all rounded-t-lg group bg-black ${active
                ? 'border-purple-500 text-white font-semibold'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-zinc-900'
                }`}
        >
            <span className={`text-lg transition-transform group-hover:scale-110 ${active ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'}`}>
                {icon}
            </span>
            <span className="text-sm">{label}</span>
        </button>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-center py-20">
            <FaGitAlt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{message}</p>
        </div>
    );
}

function CommitCard({ commit }: { commit: Commit }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-black rounded-lg border border-white/10 p-4 hover:border-purple-500/50 transition-all shadow-md group">
            <div className="flex items-start gap-4">
                {commit.author?.avatar_url && (
                    <img
                        src={commit.author.avatar_url}
                        alt={commit.commit.author.name}
                        className="w-10 h-10 rounded-full border-2 border-purple-500 group-hover:scale-110 transition-transform"
                    />
                )}
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold mb-1 break-words group-hover:text-purple-300 transition-colors">
                        {commit.commit.message.split('\n')[0]}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                            <FaUser className="text-xs text-gray-500" />
                            {commit.commit.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaClock className="text-xs text-gray-500" />
                            {formatDate(commit.commit.author.date)}
                        </span>
                        <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded text-white border border-white/5">
                            {commit.sha.substring(0, 7)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
