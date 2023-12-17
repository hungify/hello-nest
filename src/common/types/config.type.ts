export interface CorsConfig {
  isEnabled: boolean;
  origin: string | string[];
}

export interface SwaggerConfig {
  isEnabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  tag: string;
}

export interface SecurityConfig {
  saltRounds: number;
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export interface LoggerConfig {
  level: string;
  logDir: string;
}

export interface HttpConfig {
  host: string;
  port: number;
  timeout: number;
}

export interface GmailConfig {
  user: string;
  password: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUri: string;
}
export interface AppConfig {
  http: HttpConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  logger: LoggerConfig;
  nodeEnv: 'development' | 'production' | 'test';
  baseClientUrl: string;
  gmail: GmailConfig;
}
