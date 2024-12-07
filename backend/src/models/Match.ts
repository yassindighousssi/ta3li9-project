import mongoose, { Document, Schema } from 'mongoose';

export interface IMatch extends Document {
    title: string;
    description: string;
    teams: {
        home: string;
        away: string;
    };
    date: Date;
    status: 'upcoming' | 'live' | 'completed';
    duration: number;
    venue: string;
    competition: string;
    thumbnail?: string;
    stats: {
        homeScore: number;
        awayScore: number;
        possession: {
            home: number;
            away: number;
        };
    };
    highlights: {
        timestamp: number;
        description: string;
        type: 'goal' | 'card' | 'substitution' | 'other';
    }[];
}

const MatchSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Match title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Match description is required']
    },
    teams: {
        home: {
            type: String,
            required: [true, 'Home team is required']
        },
        away: {
            type: String,
            required: [true, 'Away team is required']
        }
    },
    date: {
        type: Date,
        required: [true, 'Match date is required']
    },
    status: {
        type: String,
        enum: ['upcoming', 'live', 'completed'],
        default: 'upcoming'
    },
    duration: {
        type: Number,
        default: 90,
        comment: 'Match duration in minutes'
    },
    venue: {
        type: String,
        required: [true, 'Venue is required']
    },
    competition: {
        type: String,
        required: [true, 'Competition name is required']
    },
    thumbnail: {
        type: String,
        validate: {
            validator: function(v: string) {
                return v ? /^https?:\/\/.+/.test(v) : true;
            },
            message: 'Thumbnail must be a valid URL'
        }
    },
    stats: {
        homeScore: {
            type: Number,
            default: 0
        },
        awayScore: {
            type: Number,
            default: 0
        },
        possession: {
            home: {
                type: Number,
                default: 50,
                min: 0,
                max: 100
            },
            away: {
                type: Number,
                default: 50,
                min: 0,
                max: 100
            }
        }
    },
    highlights: [{
        timestamp: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['goal', 'card', 'substitution', 'other'],
            required: true
        }
    }]
}, {
    timestamps: true
});

// Indexes for efficient querying
MatchSchema.index({ date: 1, status: 1 });
MatchSchema.index({ 'teams.home': 1, 'teams.away': 1 });
MatchSchema.index({ competition: 1 });

export default mongoose.model<IMatch>('Match', MatchSchema);
