import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { LoginHandler } from './application/commands/login.handler';
import { UserEntityRepository } from '../../infrastructure/database/shared-repository/user-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterHandler } from './application/commands/register.handler';
import { RegisterValidator } from './domain/registerValidator';
import { User } from 'src/infrastructure/database/model/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { environmentConfig } from 'src/config/environment.config';

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: environmentConfig.jwtAccessSecret,
      signOptions: { expiresIn: environmentConfig.jwtAccessTokenDuration },
    }),
    TypeOrmModule.forFeature([User, UserEntityRepository]),
  ],
  controllers: [AuthController],
  providers: [
    LoginHandler,
    RegisterHandler,
    UserEntityRepository,
    RegisterValidator,
    JwtStrategy,
  ],
})
export class AuthModule {}
