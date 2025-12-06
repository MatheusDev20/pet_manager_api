import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { LoginGuard } from 'src/modules/auth/guards/login';
import { CommandBus } from '@nestjs/cqrs';
import { created } from 'src/shared/http-response-helpers';
import { CreateAppointmentCommand } from './command';
import { CreateAppointmentDTO } from '../../../dto/create-appointment.dto';
import type { Request } from 'express';

@Controller(routesV1.version)
export class CreateAppointmentController {
  constructor(private commandBus: CommandBus) {}
  @UseGuards(LoginGuard)
  @Post(`${routesV1.pet.root}/:id/appointments`)
  async create(
    @Req() request: Request,
    @Param('id') petId: string,
    @Body() data: CreateAppointmentDTO,
  ) {
    const userId = request.user['id'];
    const command = new CreateAppointmentCommand({ ...data, petId, userId });
    const { date } = await this.commandBus.execute<
      CreateAppointmentCommand,
      { date: string }
    >(command);

    return created({ scheduledDate: date });
  }
}
