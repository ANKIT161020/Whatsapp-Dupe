// src/types/express.d.ts
// Declaration merging to extend Express Request interface

import { IUser } from '@models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
    }
  }
}
