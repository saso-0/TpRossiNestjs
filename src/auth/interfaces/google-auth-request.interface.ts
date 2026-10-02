import { Request } from 'express';
import { User } from '../../users/user.entity';

export interface GoogleAuthRequest extends Request {
  user: {
    user: User;
    jwt: string;
  };
}