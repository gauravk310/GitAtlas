import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import GitHubService from '@/lib/github';
import dbConnect from '@/lib/db';
import Repository from '@/models/Repository';
import User from '@/models/User';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Get user from database to get access token
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Initialize GitHub service
        const githubService = new GitHubService(user.accessToken);

        // Check if we should refresh from GitHub or use cached data
        const searchParams = request.nextUrl.searchParams;
        const forceRefresh = searchParams.get('refresh') === 'true';

        // Check if repositories exist in database
        const existingReposCount = await Repository.countDocuments({ userId: user._id });
        const shouldFetchFromGitHub = forceRefresh || existingReposCount === 0;

        if (shouldFetchFromGitHub) {
            // Fetch fresh data from GitHub
            const githubRepos = await githubService.getUserRepositories(1, 100);

            // Update database
            for (const repo of githubRepos) {
                await Repository.findOneAndUpdate(
                    { userId: user._id, githubId: repo.id },
                    {
                        userId: user._id,
                        githubId: repo.id,
                        name: repo.name,
                        fullName: repo.full_name,
                        description: repo.description,
                        owner: repo.owner.login,
                        private: repo.private,
                        htmlUrl: repo.html_url,
                        language: repo.language,
                        stargazersCount: repo.stargazers_count,
                        watchersCount: repo.watchers_count,
                        forksCount: repo.forks_count,
                        openIssuesCount: repo.open_issues_count,
                        defaultBranch: repo.default_branch,
                        topics: repo.topics || [],
                        size: repo.size,
                        pushedAt: repo.pushed_at,
                        lastFetchedAt: new Date(),
                    },
                    { upsert: true, new: true }
                );
            }
        }

        // Fetch repositories from database
        const repositories = await Repository.find({ userId: user._id })
            .sort({ pushedAt: -1 })
            .lean();

        return NextResponse.json(repositories);
    } catch (error) {
        console.error('Error fetching repositories:', error);

        // Log more details about the error
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }

        return NextResponse.json(
            {
                error: 'Failed to fetch repositories',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
