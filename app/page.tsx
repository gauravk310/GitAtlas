'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="border-b border-zinc-800/50 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                                <FaGithub className="w-6 h-6 text-zinc-950" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Git<span className="text-emerald-400">Atlas</span>
                            </span>
                        </div>
                    
                    </div>
                </nav>

                <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm mb-8 animate-[fadeInUp_0.6s_ease-out]">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-sm text-zinc-400 font-medium">Powered by GitHub API</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
                            Visualize Your
                            <br />
                            <span className="inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientFlow_3s_ease-in-out_infinite]">
                                Code Journey
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-12 max-w-2xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                            Transform raw GitHub data into actionable insights. Track commits, analyze patterns,
                            and understand your development workflow like never before.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
                            <button
                                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-zinc-950 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <FaGithub className="w-6 h-6 relative z-10" />
                                <span className="relative z-10">Connect GitHub</span>
                                <svg
                                    className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            {/* <button className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-zinc-100 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                                <span>View Demo</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button> */}
                        </div>

                        {/* Stats Bar */}
                        {/* <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                            <div className="text-center">
                                <div className="text-4xl font-black text-emerald-400 mb-2">10K+</div>
                                <div className="text-sm text-zinc-500 font-medium">Repositories Analyzed</div>
                            </div>
                            <div className="text-center border-l border-r border-zinc-800">
                                <div className="text-4xl font-black text-cyan-400 mb-2">50M+</div>
                                <div className="text-sm text-zinc-500 font-medium">Commits Processed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-emerald-400 mb-2">2K+</div>
                                <div className="text-sm text-zinc-500 font-medium">Active Users</div>
                            </div>
                        </div> */}
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Comprehensive analytics and visualization tools designed for modern development teams.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon="📊"
                            title="Advanced Analytics"
                            description="Deep dive into commit history, code frequency, and contribution patterns with interactive charts and real-time metrics."
                            gradient="from-emerald-500/10 to-emerald-500/5"
                            delay="0s"
                        />
                        <FeatureCard
                            icon="🌳"
                            title="Branch Visualization"
                            description="Interactive branch trees and merge flow diagrams powered by D3.js for understanding complex repository structures."
                            gradient="from-cyan-500/10 to-cyan-500/5"
                            delay="0.1s"
                        />
                        <FeatureCard
                            icon="👥"
                            title="Team Insights"
                            description="Track collaboration patterns, identify key contributors, and measure team velocity across all your projects."
                            gradient="from-emerald-500/10 to-emerald-500/5"
                            delay="0.2s"
                        />
                        <FeatureCard
                            icon="📈"
                            title="Trend Analysis"
                            description="Spot development patterns, peak productivity hours, and forecast future activity with ML-powered predictions."
                            gradient="from-cyan-500/10 to-cyan-500/5"
                            delay="0.3s"
                        />
                        <FeatureCard
                            icon="🔍"
                            title="Health Monitoring"
                            description="Keep tabs on repository health with alerts for stale branches, high issue ratios, and response time metrics."
                            gradient="from-emerald-500/10 to-emerald-500/5"
                            delay="0.4s"
                        />
                        <FeatureCard
                            icon="⚡"
                            title="Live Sync"
                            description="Real-time data synchronization ensures you're always working with the latest information from your repositories."
                            gradient="from-cyan-500/10 to-cyan-500/5"
                            delay="0.5s"
                        />
                    </div>
                </section>

                {/* Integration Showcase */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-3xl p-12 md:p-16 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                                <span className="text-sm text-emerald-400 font-bold uppercase tracking-wider">Seamless Integration</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                                Built on Modern
                                <br />
                                Tech Stack
                            </h2>
                            <p className="text-xl text-zinc-400 mb-10">
                                Powered by Next.js 14, MongoDB Atlas, and the GitHub REST API v3. Deployed on Vercel
                                with edge functions for lightning-fast performance worldwide.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['Next.js', 'TypeScript', 'MongoDB', 'GitHub API', 'Vercel', 'Custom CSS'].map((tech, i) => (
                                    <span
                                        key={tech}
                                        className="px-5 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm font-bold text-zinc-300"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10">
                            Connect your GitHub account in seconds and unlock powerful insights into your development workflow.
                        </p>
                        <button
                            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                            className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-zinc-950 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(52,211,153,0.5)] active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <FaGithub className="w-7 h-7 relative z-10" />
                            <span className="relative z-10">Start Analyzing Now</span>
                            <svg
                                className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-zinc-800/50 mt-24">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                                    <FaGithub className="w-6 h-6 text-zinc-950" />
                                </div>
                                <span className="text-xl font-bold tracking-tight">
                                    Git<span className="text-emerald-400">Atlas</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-8">
                                <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium">
                                    Privacy
                                </a>
                                <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium">
                                    Terms
                                </a>
                                <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium">
                                    GitHub
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
                            © 2026 GitAtlas. Built with Next.js, MongoDB, and GitHub API.
                        </div>
                    </div>
                </footer>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradientFlow {
                    0%, 100% {
                        background-position: 0% center;
                    }
                    50% {
                        background-position: 100% center;
                    }
                }

                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    gradient,
    delay
}: {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    delay: string;
}) {
    return (
        <div
            className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 hover:scale-[1.02] animate-[fadeInUp_0.6s_ease-out_both]"
            style={{ animationDelay: delay }}
        >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Content */}
            <div className="relative z-10">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <h3 className="text-2xl font-black text-zinc-100 mb-3 tracking-tight">
                    {title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-emerald-500/10"></div>
        </div>
    );
}