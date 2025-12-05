import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CookieData } from 'src/@types';

@Injectable()
export class CookiesUtils {
  setCookies(currResponse: Response, cookieData: CookieData): void {
    const { accessToken } = cookieData;

    currResponse.cookie('token', accessToken, {
      httpOnly: false,
      secure: false,
      maxAge: 30 * 60 * 1000,
    });
  }

  invalidateCookies(currResponse: Response): void {
    currResponse.cookie('token', '', {
      httpOnly: false,
      secure: false,
      maxAge: 5000,
    });
  }
}
