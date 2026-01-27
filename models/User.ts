import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    githubId: string;
    username: string;
    email: string;
    name: string;
    avatarUrl: string;
    accessToken: string;
    refreshToken?: string;
    bio?: string;
    location?: string;
    company?: string;
    blog?: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        githubId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            required: true,
        },
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        bio: String,
        location: String,
        company: String,
        blog: String,
        publicRepos: {
            type: Number,
            default: 0,
        },
        followers: {
            type: Number,
            default: 0,
        },
        following: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default models.User || model<IUser>('User', UserSchema);
