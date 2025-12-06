import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { CreatePetDTO } from '../../../dto/create-pet.dto';
import { created, HttpResponse } from 'src/shared/http-response-helpers';
import { CreatePetCommand } from './command';
import { LoginGuard } from 'src/modules/auth/guards/login';
import type { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';

@Controller(routesV1.version)
export class CreatePetController {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(LoginGuard)
  @Post(routesV1.pet.root)
  async create(
    @Req() request: Request,
    @Body() body: CreatePetDTO,
  ): Promise<HttpResponse<{ id: string }>> {
    console.log(request.user);
    const ownerId = request.user.id;

    const command = new CreatePetCommand({ ...body, ownerId });
    console.log('Dispatching CreatePetCommand with data:', {
      ...body,
      ownerId,
    });
    const { id } = await this.commandBus.execute<
      CreatePetCommand,
      { id: string }
    >(command);

    return created({ id });
  }
}
