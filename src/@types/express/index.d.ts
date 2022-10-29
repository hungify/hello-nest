import type { UserPayload } from '~auth/interfaces/auth.interface';

declare global {
  declare namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
