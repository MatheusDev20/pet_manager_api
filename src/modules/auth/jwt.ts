import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtData } from 'src/@types';
import { JwtConfigService } from './config/secrets';

@Injectable()
export class JwtUtils {
  constructor(
    private jwtService: JwtService,
    private jwtConfig: JwtConfigService,
  ) {}

  async generate(payload: any): Promise<Omit<JwtData, 'user'>> {
    const jwtOptions = this.jwtConfig.getJwtOptions();

    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtOptions.secret,
      expiresIn: jwtOptions.expiration as any,
    });

    return {
      access_token,
      expiration: jwtOptions.expiration,
    };
  }

  async verifyToken(token: string): Promise<{ id: string }> {
    const jwtOptions = this.jwtConfig.getJwtOptions();
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtOptions.secret,
    });

    return { id: payload.sub };
  }
}
