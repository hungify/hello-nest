import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '~/auth/auth.module';
import appConfig from '~/common/configs';
import { FormatResponseMiddleware } from '~/common/middlewares';
import { DatabaseModule } from '~/database/database.module';
import { AbilitiesModule } from '~/modules/abilities/abilities.module';
import { PostsModule } from '~/modules/posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    // WinstonModule.forRoot(loggerConfig),
    DatabaseModule,
    AbilitiesModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FormatResponseMiddleware).forRoutes('*');
  }
}
