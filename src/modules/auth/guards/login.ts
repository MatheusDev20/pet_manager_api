/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtUtils } from '../jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private jwtManager: JwtUtils) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (this.areCookiesExpired(request.cookies)) {
      throw new UnauthorizedException('Invalid Token');
    }

    const data = this.exctractFromCookies(request);

    if (!data || !data.accessToken) {
      throw new UnauthorizedException('EXPIRED ACCESS TOKEN');
    }

    try {
      const payload = await this.jwtManager.verifyToken(data.accessToken);
      request['user'] = payload;
    } catch (err: any) {
      throw new UnauthorizedException(
        'Token Signature Verification Failed',
        err,
      );
    }

    return true;
  }

  exctractFromCookies(request: Request): { accessToken: string } | null {
    return {
      accessToken: request.cookies.token || null,
    };
  }

  areCookiesExpired = (cookies: any) => {
    return Object.keys(cookies).length === 0;
  };
}
