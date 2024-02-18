import { UserPayload } from '~/modules/auth/types/payload';

declare global {
  namespace Express {
    interface User extends UserPayload {}
  }
}
