import { registerAs } from '@nestjs/config';
import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface ConnectionOptions extends PostgresConnectionOptions {
  keepConnectionAlive: boolean;
}

export default registerAs(
  'postgres',
  (): ConnectionOptions => ({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [path.join(__dirname, '../../**/entities/*.entity.{js,ts}')],
    keepConnectionAlive: true,
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    type: 'postgres',
  }),
);
