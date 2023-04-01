import { Token } from './token.model';

export class AuthTokenResponse extends Token {
  constructor(partial: Partial<AuthTokenResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
