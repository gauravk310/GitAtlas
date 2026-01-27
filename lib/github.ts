import { Octokit } from '@octokit/rest';

export class GitHubService {
    private octokit: Octokit;

    constructor(accessToken: string) {
        this.octokit = new Octokit({
            auth: accessToken,
        });
    }

    /**
     * Get authenticated user's repositories
     */
    async getUserRepositories(page = 1, perPage = 30) {
        try {
            const response = await this.octokit.repos.listForAuthenticatedUser({
                page,
                per_page: perPage,
                sort: 'updated',
                direction: 'desc',
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user repositories:', error);
            throw error;
        }
    }

    /**
     * Get repository details
     */
    async getRepository(owner: string, repo: string) {
        try {
            const response = await this.octokit.repos.get({
                owner,
                repo,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching repository:', error);
            throw error;
        }
    }

    /**
     * Get commit history for a repository
     */
    async getCommits(owner: string, repo: string, page = 1, perPage = 100, since?: string) {
        try {
            const params: any = {
                owner,
                repo,
                page,
                per_page: perPage,
            };

            if (since) {
                params.since = since;
            }

            const response = await this.octokit.repos.listCommits(params);

            return response.data;
        } catch (error) {
            console.error('Error fetching commits:', error);
            throw error;
        }
    }

    /**
     * Get detailed commit information
     */
    async getCommitDetails(owner: string, repo: string, sha: string) {
        try {
            const response = await this.octokit.repos.getCommit({
                owner,
                repo,
                ref: sha,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching commit details:', error);
            throw error;
        }
    }

    /**
     * Get branches for a repository
     */
    async getBranches(owner: string, repo: string, page = 1, perPage = 100) {
        try {
            const response = await this.octokit.repos.listBranches({
                owner,
                repo,
                page,
                per_page: perPage,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching branches:', error);
            throw error;
        }
    }

    /**
     * Get contributors for a repository
     */
    async getContributors(owner: string, repo: string, page = 1, perPage = 100) {
        try {
            const response = await this.octokit.repos.listContributors({
                owner,
                repo,
                page,
                per_page: perPage,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching contributors:', error);
            throw error;
        }
    }

    /**
     * Get pull requests for a repository
     */
    async getPullRequests(owner: string, repo: string, state: 'open' | 'closed' | 'all' = 'all', page = 1, perPage = 100) {
        try {
            const response = await this.octokit.pulls.list({
                owner,
                repo,
                state,
                page,
                per_page: perPage,
                sort: 'updated',
                direction: 'desc',
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching pull requests:', error);
            throw error;
        }
    }

    /**
     * Get issues for a repository
     */
    async getIssues(owner: string, repo: string, state: 'open' | 'closed' | 'all' = 'all', page = 1, perPage = 100) {
        try {
            const response = await this.octokit.issues.listForRepo({
                owner,
                repo,
                state,
                page,
                per_page: perPage,
                sort: 'updated',
                direction: 'desc',
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching issues:', error);
            throw error;
        }
    }

    /**
     * Get repository languages
     */
    async getLanguages(owner: string, repo: string) {
        try {
            const response = await this.octokit.repos.listLanguages({
                owner,
                repo,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching languages:', error);
            throw error;
        }
    }

    /**
     * Get rate limit status
     */
    async getRateLimit() {
        try {
            const response = await this.octokit.rateLimit.get();
            return response.data;
        } catch (error) {
            console.error('Error fetching rate limit:', error);
            throw error;
        }
    }

    /**
     * Get authenticated user info
     */
    async getAuthenticatedUser() {
        try {
            const response = await this.octokit.users.getAuthenticated();
            return response.data;
        } catch (error) {
            console.error('Error fetching authenticated user:', error);
            throw error;
        }
    }
}

export default GitHubService;
