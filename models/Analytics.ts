import mongoose, { Schema, model, models } from 'mongoose';

export interface IAnalytics {
    _id: mongoose.Types.ObjectId;
    repositoryId: mongoose.Types.ObjectId;
    period: 'daily' | 'weekly' | 'monthly';
    date: Date;
    metrics: {
        totalCommits: number;
        totalAdditions: number;
        totalDeletions: number;
        totalFilesChanged: number;
        activeContributors: number;
        topContributors: Array<{
            email: string;
            name: string;
            commits: number;
            additions: number;
            deletions: number;
        }>;
        commitsByHour: number[];
        commitsByDay: number[];
        languageBreakdown: Map<string, number>;
        branchCount: number;
        openPRs: number;
        closedPRs: number;
        openIssues: number;
        closedIssues: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        repositoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Repository',
            required: true,
        },
        period: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        metrics: {
            totalCommits: { type: Number, default: 0 },
            totalAdditions: { type: Number, default: 0 },
            totalDeletions: { type: Number, default: 0 },
            totalFilesChanged: { type: Number, default: 0 },
            activeContributors: { type: Number, default: 0 },
            topContributors: [
                {
                    email: String,
                    name: String,
                    commits: Number,
                    additions: Number,
                    deletions: Number,
                },
            ],
            commitsByHour: [Number],
            commitsByDay: [Number],
            languageBreakdown: {
                type: Map,
                of: Number,
            },
            branchCount: { type: Number, default: 0 },
            openPRs: { type: Number, default: 0 },
            closedPRs: { type: Number, default: 0 },
            openIssues: { type: Number, default: 0 },
            closedIssues: { type: Number, default: 0 },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
AnalyticsSchema.index({ repositoryId: 1, period: 1, date: -1 }, { unique: true });

export default models.Analytics || model<IAnalytics>('Analytics', AnalyticsSchema);
