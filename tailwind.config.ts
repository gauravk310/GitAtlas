import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // GitHub-inspired color palette
                github: {
                    canvas: {
                        default: '#0d1117',
                        subtle: '#161b22',
                        inset: '#010409',
                    },
                    border: {
                        default: '#30363d',
                        muted: '#21262d',
                    },
                    fg: {
                        default: '#e6edf3',
                        muted: '#7d8590',
                        subtle: '#6e7681',
                    },
                    accent: {
                        fg: '#2f81f7',
                        emphasis: '#1f6feb',
                        muted: 'rgba(56, 139, 253, 0.4)',
                        subtle: 'rgba(56, 139, 253, 0.15)',
                    },
                    success: {
                        fg: '#3fb950',
                        emphasis: '#238636',
                        muted: 'rgba(46, 160, 67, 0.4)',
                        subtle: 'rgba(46, 160, 67, 0.15)',
                    },
                    danger: {
                        fg: '#f85149',
                        emphasis: '#da3633',
                        muted: 'rgba(248, 81, 73, 0.4)',
                        subtle: 'rgba(248, 81, 73, 0.15)',
                    },
                    neutral: {
                        muted: 'rgba(110, 118, 129, 0.4)',
                    },
                },
            },
            fontFamily: {
                mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
                sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'github': '0 0 0 1px rgba(240, 246, 252, 0.1)',
                'github-lg': '0 8px 24px rgba(1, 4, 9, 0.5)',
            },
            borderRadius: {
                'github': '6px',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};

export default config;
