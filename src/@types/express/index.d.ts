import type { UserPayload } from '~/auth/interfaces/auth.interface';

declare global {
  namespace Express {
    interface User extends UserPayload {}
  }
}
export {};
