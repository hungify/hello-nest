import type { UserPayload } from '~auth/interfaces/auth.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}
