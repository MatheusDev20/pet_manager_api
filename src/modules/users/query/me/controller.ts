import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginGuard } from 'src/modules/auth/guards/login';
import { ok } from 'src/shared/http-response-helpers';
import { GetMeQuery } from './query';
import type { Request } from 'express';
import { routesV1 } from 'src/config/app.routes';

@Controller(routesV1.version)
export class GetMeController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(LoginGuard)
  @Get(routesV1.user.root + '/me')
  async me(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) throw new Error('User ID not found in request');

    const query = new GetMeQuery({ userId });

    const data = await this.queryBus.execute(query);
    return ok(data);
  }
}
