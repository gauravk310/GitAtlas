import mongoose, { Schema, model, models } from 'mongoose';

export interface IRepository {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    githubId: number;
    name: string;
    fullName: string;
    description?: string;
    owner: string;
    private: boolean;
    htmlUrl: string;
    language?: string;
    stargazersCount: number;
    watchersCount: number;
    forksCount: number;
    openIssuesCount: number;
    defaultBranch: string;
    topics: string[];
    size: number;
    pushedAt: Date;
    lastFetchedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const RepositorySchema = new Schema<IRepository>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        githubId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        description: String,
        owner: {
            type: String,
            required: true,
        },
        private: {
            type: Boolean,
            default: false,
        },
        htmlUrl: {
            type: String,
            required: true,
        },
        language: String,
        stargazersCount: {
            type: Number,
            default: 0,
        },
        watchersCount: {
            type: Number,
            default: 0,
        },
        forksCount: {
            type: Number,
            default: 0,
        },
        openIssuesCount: {
            type: Number,
            default: 0,
        },
        defaultBranch: {
            type: String,
            default: 'main',
        },
        topics: [String],
        size: {
            type: Number,
            default: 0,
        },
        pushedAt: Date,
        lastFetchedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
RepositorySchema.index({ userId: 1, githubId: 1 }, { unique: true });
RepositorySchema.index({ userId: 1, lastFetchedAt: -1 });

export default models.Repository || model<IRepository>('Repository', RepositorySchema);
