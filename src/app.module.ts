import { Module, type NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '~/database/database.module';
import { AbilitiesModule } from '~/modules/abilities/abilities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './common/configs/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseModule,
    AbilitiesModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
