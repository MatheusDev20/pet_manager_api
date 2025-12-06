import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { LoginGuard } from 'src/modules/auth/guards/login';
import { CommandBus } from '@nestjs/cqrs';
import { updated } from 'src/shared/http-response-helpers';
import { UpdateAppointmentDTO } from '../../../dto/update-appointment.dto';
import { UpdateAppointmentCommand } from './command';

@Controller(routesV1.version)
export class UpdateAppointmentController {
  constructor(private commandBus: CommandBus) {}
  @UseGuards(LoginGuard)
  @Put(`${routesV1.pet.root}/appointments/:id`)
  async create(
    @Param('id') appointmentId: string,
    @Body() data: UpdateAppointmentDTO,
  ) {
    const command = new UpdateAppointmentCommand({ ...data, appointmentId });
    const { scheduledDate } = await this.commandBus.execute<
      UpdateAppointmentDTO,
      { scheduledDate: string }
    >(command);

    return updated({ scheduledDate });
  }
}
