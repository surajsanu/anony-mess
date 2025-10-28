import { User } from "@/model/User";

export interface AuthCredentials {
  identifier: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

export type AuthUserResponse = Omit<User, 'password' | 'verifyCode' | 'verifyCodeExpiry' | 'messages'>;