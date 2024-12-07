import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  nativeName: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export const Language = mongoose.model('Language', languageSchema);
