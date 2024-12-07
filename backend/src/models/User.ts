import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: 'user' | 'commentator' | 'admin';
    isVisuallyImpaired: boolean;
    preferredAudioSettings: {
        volume: number;
        speed: number;
        pitch: number;
    };
    languagePreferences: {
        siteLanguage: string;
        commentaryLanguages: {
            language: string;
            preference: 'primary' | 'secondary';
        }[];
    };
    profileImage?: string;
    bio?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    role: {
        type: String,
        enum: ['user', 'commentator', 'admin'],
        default: 'user'
    },
    isVisuallyImpaired: {
        type: Boolean,
        default: false
    },
    preferredAudioSettings: {
        volume: {
            type: Number,
            default: 1.0,
            min: 0,
            max: 1
        },
        speed: {
            type: Number,
            default: 1.0,
            min: 0.5,
            max: 2
        },
        pitch: {
            type: Number,
            default: 1.0,
            min: 0.5,
            max: 2
        }
    },
    languagePreferences: {
        siteLanguage: {
            type: String,
            enum: ['ar', 'ber', 'fr', 'en', 'es'],
            default: 'ar'
        },
        commentaryLanguages: [{
            language: {
                type: String,
                enum: ['ar', 'ber', 'fr', 'en', 'es']
            },
            preference: {
                type: String,
                enum: ['primary', 'secondary']
            }
        }]
    },
    profileImage: String,
    bio: String
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
