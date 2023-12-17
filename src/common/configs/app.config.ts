import { AppConfig } from '../types/config.type';

export default (): AppConfig => ({
  baseClientUrl: process.env.BASE_CLIENT_URL,
  http: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 5000,
  },
  security: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
    isEnabled:
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test',
  },
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    tag: process.env.SWAGGER_TAG,
    isEnabled: process.env.SWAGGER_ENABLED === 'true',
    path: process.env.SWAGGER_PATH,
  },
  logger: {
    level: process.env.LOG_LEVEL,
    logDir: process.env.LOG_DIR,
  },
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASSWORD,
    redirectUri: process.env.GMAIL_REDIRECT_URI,
  },
});
