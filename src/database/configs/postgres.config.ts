import { registerAs } from '@nestjs/config';
import path from 'path';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface ConnectionOptions extends PostgresConnectionOptions {
  keepConnectionAlive: boolean;
}

export default registerAs('postgres', (): ConnectionOptions => {
  const nodeEnv = process.env.NODE_ENV;
  const isProduction = nodeEnv === 'production';

  const host = process.env.POSTGRES_HOST;
  const port = Number(process.env.POSTGRES_PORT);
  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DB;
  const entities = [path.join(__dirname, '../**/*.entity{.ts,.js}')];
  const migrations = [path.join(__dirname, '../migrations/*{.ts,.js}')];
  const url = `postgres://${username}:${password}@${host}:${port}/${database}`;
  const ssl =
    host === 'localhost' && !isProduction
      ? false
      : { rejectUnauthorized: false };

  return {
    synchronize: !isProduction,
    logging: !isProduction,
    entities,
    keepConnectionAlive: true,
    migrations,
    migrationsRun: true,
    migrationsTableName: 'migrations',
    type: 'postgres',
    ssl,
    url,
  };
});
