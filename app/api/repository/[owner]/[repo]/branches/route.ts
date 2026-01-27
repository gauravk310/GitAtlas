import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import GitHubService from '@/lib/github';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ owner: string; repo: string }> }
) {
    try {
        const { owner, repo } = await params;
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

        // Fetch branches from GitHub
        const branches = await githubService.getBranches(owner, repo);

        return NextResponse.json(branches);
    } catch (error) {
        console.error('Error fetching branches:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch branches',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
