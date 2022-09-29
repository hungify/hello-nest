export interface AuthJwtPayload {
  id: number | string;
  email: string;
}

export type TokenType = 'accessToken' | 'refreshToken';
