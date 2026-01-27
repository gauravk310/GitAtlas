'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        {/* Logo/Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50"></div>
                                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-full">
                                    <FaGithub className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Atlas</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                            Comprehensive GitHub Analytics Platform
                        </p>
                        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                            Visualize your repositories, analyze commit patterns, track contributors, and gain deep insights into your development workflow.
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50"
                        >
                            <FaGithub className="w-6 h-6" />
                            <span>Sign in with GitHub</span>
                            <svg
                                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        {/* Features Grid */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon="📊"
                                title="Advanced Analytics"
                                description="Comprehensive metrics on commits, contributors, and code activity over time"
                            />
                            <FeatureCard
                                icon="🌳"
                                title="Branch Visualization"
                                description="Interactive branch trees and merge flow visualizations with D3.js"
                            />
                            <FeatureCard
                                icon="👥"
                                title="Contributor Insights"
                                description="Track team collaboration patterns and individual contributions"
                            />
                            <FeatureCard
                                icon="📈"
                                title="Trend Analysis"
                                description="Identify development patterns and peak productivity periods"
                            />
                            <FeatureCard
                                icon="🔍"
                                title="Repository Health"
                                description="Monitor inactive branches, issue ratios, and response times"
                            />
                            <FeatureCard
                                icon="⚡"
                                title="Real-time Updates"
                                description="Live data synchronization with your GitHub repositories"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p>Built with Next.js, MongoDB, and GitHub API</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    );
}
