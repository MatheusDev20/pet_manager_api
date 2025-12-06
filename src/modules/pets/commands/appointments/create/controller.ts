import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { LoginGuard } from 'src/modules/auth/guards/login';
import { CommandBus } from '@nestjs/cqrs';
import { created } from 'src/shared/http-response-helpers';
import { CreateAppointmentCommand } from './command';
import { CreateAppointmentDTO } from '../../../dto/create-appointment.dto';

@Controller(routesV1.version)
export class CreateAppointmentController {
  constructor(private commandBus: CommandBus) {}
  @UseGuards(LoginGuard)
  @Post(`${routesV1.pet.root}/:id/appointments`)
  async create(@Param('id') petId: string, @Body() data: CreateAppointmentDTO) {
    const command = new CreateAppointmentCommand({ ...data, petId });
    const { date } = await this.commandBus.execute<
      CreateAppointmentCommand,
      { date: string }
    >(command);

    return created({ scheduledDate: date });
  }
}
