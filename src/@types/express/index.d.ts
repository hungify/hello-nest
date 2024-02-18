import { UserPayload } from '~/modules/auth/types/payload';

declare global {
  namespace Express {
    // interface Request {
    //   user?: Express.User;
    // }
    interface User extends UserPayload {}
  }
}
