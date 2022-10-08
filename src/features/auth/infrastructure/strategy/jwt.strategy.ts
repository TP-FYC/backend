import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from 'src/domain/user.repository';
import { environmentConfig } from 'src/config/environment.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environmentConfig.jwtAccessSecret,
      signOptions: { expiresIn: environmentConfig.jwtAccessTokenDuration },
    });
    this.userRepository = userRepository;
  }

  async validate(payload: JwtPayload): Promise<boolean> {
    const isValid = await this.validateUserByJwt(payload);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return isValid;
  }

  public async validateUserByJwt(payload: JwtPayload): Promise<boolean> {
    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
