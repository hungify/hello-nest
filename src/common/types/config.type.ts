import { PostgresConnectionConfig } from '~/database/configs/postgres.config';

interface CorsConfig {
  isEnabled: boolean;
  origin: string | string[];
}

interface SwaggerConfig {
  isEnabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  tag: string;
}

interface SecurityConfig {
  saltRounds: number;
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

interface LoggerConfig {
  level: string;
  logDir: string;
}

interface HttpConfig {
  host: string;
  port: number;
  timeout: number;
}

interface GmailConfig {
  user: string;
  password: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUri: string;
}

type NodeEnv = 'development' | 'production' | 'test';

export interface AppConfig {
  http: HttpConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  logger: LoggerConfig;
  nodeEnv: NodeEnv;
  baseClientUrl: string;
  gmail: GmailConfig;
  postgres: PostgresConnectionConfig;
}
