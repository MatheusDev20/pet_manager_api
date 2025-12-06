import { QueryBus } from '@nestjs/cqrs';
import { routesV1 } from 'src/config/app.routes';
import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ReadAppointmentsQueryDTO } from 'src/modules/pets/dto/list-appointments.dto';
import { ReadAppointmentsQueryCommand } from './query';
import type { Request } from 'express';
import { LoginGuard } from 'src/modules/auth/guards/login';
import { ok } from 'src/shared/http-response-helpers';

@Controller(routesV1.version)
export class ReadAppointmentsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(LoginGuard)
  @Get(`${routesV1.pet.root}/:id/appointments`)
  async read(
    @Req() request: Request,
    @Param('id') petId: string,
    @Query() query: ReadAppointmentsQueryDTO,
  ) {
    const { serviceFilter, dateFilter } = query;
    const ownerId = request.user.id;
    const command = new ReadAppointmentsQueryCommand({
      ownerId,
      petId,
      serviceFilter: serviceFilter as
        | 'bath'
        | 'surgery'
        | 'vet_consultation'
        | 'vaccine'
        | undefined,
      dateFilter: dateFilter,
    });

    const response =
      await this.queryBus.execute<ReadAppointmentsQueryCommand>(command);

    return ok(response);
  }
}
