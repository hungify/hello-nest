import type { UserPayload } from '~/auth/interfaces/auth.interface';

declare global {
  namespace Express {
    // interface Request {
    //   user?: Express.User;
    // }
    interface User extends UserPayload {}
  }
}
