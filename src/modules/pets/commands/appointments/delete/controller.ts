import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/config/app.routes';
import { deleted, HttpResponse } from 'src/shared/http-response-helpers';
import { LoginGuard } from 'src/modules/auth/guards/login';
import type { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteAppointmentCommand } from './command';

@Controller(routesV1.version)
export class DeleteAppointmentController {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(LoginGuard)
  @Delete(`${routesV1.pet.root}/appointments/:id`)
  async delete(
    @Req() request: Request,
    @Param('id') appointmentId: string,
  ): Promise<HttpResponse<{ id: string }>> {
    const ownerId = request.user.id;

    const command = new DeleteAppointmentCommand({ ownerId, appointmentId });

    const { id } = await this.commandBus.execute<
      DeleteAppointmentCommand,
      { id: string }
    >(command);

    return deleted({ id });
  }
}
