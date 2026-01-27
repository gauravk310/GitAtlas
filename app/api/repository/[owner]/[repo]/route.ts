import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import GitHubService from '@/lib/github';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(
    request: NextRequest,
    { params }: { params: { owner: string; repo: string } }
) {
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

        // Fetch repository details from GitHub
        const repository = await githubService.getRepository(params.owner, params.repo);

        return NextResponse.json(repository);
    } catch (error) {
        console.error('Error fetching repository details:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch repository details',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
