import mongoose, { Schema, model, models } from 'mongoose';

export interface ICommit {
    _id: mongoose.Types.ObjectId;
    repositoryId: mongoose.Types.ObjectId;
    sha: string;
    message: string;
    author: {
        name: string;
        email: string;
        date: Date;
    };
    committer: {
        name: string;
        email: string;
        date: Date;
    };
    additions: number;
    deletions: number;
    totalChanges: number;
    filesChanged: number;
    branch?: string;
    parents: string[];
    htmlUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommitSchema = new Schema<ICommit>(
    {
        repositoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Repository',
            required: true,
        },
        sha: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        author: {
            name: String,
            email: String,
            date: Date,
        },
        committer: {
            name: String,
            email: String,
            date: Date,
        },
        additions: {
            type: Number,
            default: 0,
        },
        deletions: {
            type: Number,
            default: 0,
        },
        totalChanges: {
            type: Number,
            default: 0,
        },
        filesChanged: {
            type: Number,
            default: 0,
        },
        branch: String,
        parents: [String],
        htmlUrl: String,
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
CommitSchema.index({ repositoryId: 1, sha: 1 }, { unique: true });
CommitSchema.index({ repositoryId: 1, 'author.date': -1 });
CommitSchema.index({ 'author.email': 1 });

export default models.Commit || model<ICommit>('Commit', CommitSchema);
