import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type JWTOptions = {
  secret: string;
  expiration: string;
};

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  getJwtOptions(): JWTOptions {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const jwtExpiration = this.configService.get<string>('JWT_EXPIRATION');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    if (!jwtExpiration) {
      throw new Error('JWT_EXPIRATION is not defined in environment variables');
    }

    return {
      secret: jwtSecret,
      expiration: jwtExpiration,
    };
  }
}
