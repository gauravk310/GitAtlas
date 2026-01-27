import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'read:user user:email repo',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'github') {
                try {
                    await dbConnect();

                    const githubProfile = profile as any;

                    // Update or create user in database
                    await User.findOneAndUpdate(
                        { githubId: githubProfile.id.toString() },
                        {
                            githubId: githubProfile.id.toString(),
                            username: githubProfile.login,
                            email: user.email,
                            name: user.name || githubProfile.login,
                            avatarUrl: user.image || '',
                            accessToken: account.access_token,
                            refreshToken: account.refresh_token,
                            bio: githubProfile.bio,
                            location: githubProfile.location,
                            company: githubProfile.company,
                            blog: githubProfile.blog,
                            publicRepos: githubProfile.public_repos || 0,
                            followers: githubProfile.followers || 0,
                            following: githubProfile.following || 0,
                        },
                        { upsert: true, new: true }
                    );

                    return true;
                } catch (error) {
                    console.error('Error saving user to database:', error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const githubProfile = profile as any;
                token.accessToken = account.access_token;
                token.githubId = githubProfile.id.toString();
                token.username = githubProfile.login;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).githubId = token.githubId;
                (session.user as any).username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
