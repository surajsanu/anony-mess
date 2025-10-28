import { Types } from 'mongoose';

export interface MongoUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  messages: Array<{
    content: string;
    createdAt: Date;
  }>;
}