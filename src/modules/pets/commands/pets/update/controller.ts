import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { created, HttpResponse } from 'src/shared/http-response-helpers';
import { LoginGuard } from 'src/modules/auth/guards/login';
import type { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { UpdatedPetCommand } from './command';
import { UpdatePetDTO } from '../../../dto/update-pet.dto';

@Controller(routesV1.version)
export class UpdatePetController {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(LoginGuard)
  @Put(`${routesV1.pet.root}/:id`)
  async read(
    @Req() request: Request,
    @Body() body: UpdatePetDTO,
    @Param('id') petId: string,
  ): Promise<HttpResponse<{ id: string }>> {
    const ownerId = request.user.id;

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided to update the pet.',
      );
    }

    const command = new UpdatedPetCommand({ ...body, ownerId, petId });

    const { id } = await this.commandBus.execute<
      UpdatedPetCommand,
      { id: string }
    >(command);

    return created({ id });
  }
}
