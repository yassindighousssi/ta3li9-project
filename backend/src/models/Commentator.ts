import mongoose, { Document, Schema } from 'mongoose';

interface CommentatorStats {
  followers: number;
  likes: number;
}

interface CommentatorDocument extends Document {
  userId: {
    type: Schema.Types.ObjectId;
    ref: 'User';
    required: true;
  };
  languages: [{
    language: {
      type: Schema.Types.ObjectId;
      ref: 'Language';
      required: true;
    };
    proficiencyLevel: {
      type: String;
      enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'NATIVE'];
      required: true;
    };
    isVerified: {
      type: Boolean;
      default: false;
    };
  }];
  activeLanguage: {
    type: Schema.Types.ObjectId;
    ref: 'Language';
  };
  rating: {
    type: Number;
    default: 0;
  };
  totalMatches: {
    type: Number;
    default: 0;
  };
  averageListeners: {
    type: Number;
    default: 0;
  };
  stats: CommentatorStats;
};

const commentatorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  languages: [{
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: true
    },
    proficiencyLevel: {
      type: String,
      enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'NATIVE'],
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  }],
  activeLanguage: {
    type: Schema.Types.ObjectId,
    ref: 'Language'
  },
  rating: {
    type: Number,
    default: 0
  },
  totalMatches: {
    type: Number,
    default: 0
  },
  averageListeners: {
    type: Number,
    default: 0
  },
  stats: {
    followers: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  }
});

export const Commentator = mongoose.model<CommentatorDocument>('Commentator', commentatorSchema);
