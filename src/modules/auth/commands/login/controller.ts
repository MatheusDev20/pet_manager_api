import { Body, Controller, Post, Res } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { CommandBus } from '@nestjs/cqrs';
import type { Response } from 'express';

import { LoginDTO } from '../../dto/login.dto';
import { LoginCommand } from './commands';
import { authenticated, HttpResponse } from 'src/shared/http-response-helpers';
import { CookiesUtils } from '../../cookies';

@Controller(routesV1.version)
export class AuthController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly cookies: CookiesUtils,
  ) {}

  @Post(routesV1.auth.login)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginData: LoginDTO,
  ): Promise<HttpResponse<{ status: string; expiresIn: string }>> {
    const command = new LoginCommand(loginData);

    const { accessToken, expiresIn } = await this.commandBus.execute<
      LoginCommand,
      { accessToken: string; expiresIn: string }
    >(command);

    this.cookies.setCookies(response, { accessToken });

    return authenticated({ status: 'LogedIn', expiresIn: expiresIn });
  }
}
