import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '~/common/types/config.type';
import postgresConnectionConfig from './configs/postgres.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [postgresConnectionConfig],
          expandVariables: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig>) => {
        return configService.get('postgres', {
          infer: true,
        });
      },
    }),
  ],
})
export class DatabaseModule {}
