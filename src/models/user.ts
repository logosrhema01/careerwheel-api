import { IUser } from '@/interfaces/IUser';
import mongoose from 'mongoose';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'RATHER NOT SAY',
}

enum Occupation {
  STUDENT = 'Student',
  PROFESSIONAL = 'Professional',
  UNEMPLOYED = 'Unemployed',
}

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    active: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    salt: String,
    firstName: String,
    lastName: String,
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    location: String,
    occupation: {
      type: String,
      enum: Occupation,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
