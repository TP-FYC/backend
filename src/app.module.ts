import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';
import { environmentConfig } from './config/environment.config';
import { ContentModule } from './features/content/content.module';
import { UserReactToContentModule } from './features/user-react-to-content/user-react-to-content.module';
import { NotificationModule } from './features/notifications/notification.module';
import { FollowModule } from './features/follow/follow.module';
import { UserModule } from './features/user/user.module';
import { ProgramModule } from './features/program/program.module';

@Module({
  imports: [
    AuthModule,
    ContentModule,
    UserReactToContentModule,
    NotificationModule,
    FollowModule,
    UserModule,
    ProgramModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: environmentConfig.dbUrl,
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
