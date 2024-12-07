import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: mongoose.Types.ObjectId;
    match: mongoose.Types.ObjectId;
    content: string;
    audioUrl?: string;
    timestamp: number;
    type: 'text' | 'audio';
    reactions: {
        likes: number;
        shares: number;
    };
    tags: string[];
    language: string;
    isLive: boolean;
}

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        maxlength: [1000, 'Comment cannot be longer than 1000 characters']
    },
    audioUrl: {
        type: String,
        validate: {
            validator: function(v: string) {
                return v ? /^https?:\/\/.+/.test(v) : true;
            },
            message: 'Audio URL must be a valid URL'
        }
    },
    timestamp: {
        type: Number,
        required: true,
        comment: 'Timestamp in the match when the comment was made (in seconds)'
    },
    type: {
        type: String,
        enum: ['text', 'audio'],
        default: 'text'
    },
    reactions: {
        likes: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        }
    },
    tags: [{
        type: String,
        trim: true
    }],
    language: {
        type: String,
        default: 'ar',
        enum: ['ar', 'en', 'fr']
    },
    isLive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for efficient querying
CommentSchema.index({ match: 1, timestamp: 1 });
CommentSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model<IComment>('Comment', CommentSchema);
