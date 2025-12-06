import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { HttpResponse, ok } from 'src/shared/http-response-helpers';
import { LoginGuard } from 'src/modules/auth/guards/login';
import type { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ReadMyPetsQuery } from './query';
import { Pet } from 'src/generated/prisma/client';

@Controller(routesV1.version)
export class ReadPetsController {
  constructor(private queryBus: QueryBus) {}

  @UseGuards(LoginGuard)
  @Get(`${routesV1.pet.root}`)
  async update(@Req() request: Request): Promise<HttpResponse<Pet[]>> {
    const ownerId = request.user.id;

    const query = new ReadMyPetsQuery({ ownerId });

    const pets = await this.queryBus.execute<ReadMyPetsQuery, Pet[]>(query);

    return ok(pets);
  }
}
