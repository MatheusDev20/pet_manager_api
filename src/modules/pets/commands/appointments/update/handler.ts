/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { isBeforeToday } from 'src/shared/date';
import { AppointmentsRepository } from '../../../repository/appointment.repository';
import { UpdateAppointmentCommand } from './command';

@CommandHandler(UpdateAppointmentCommand)
export class UpdateAppointmentService {
  constructor(private readonly repository: AppointmentsRepository) {}

  async execute(
    command: UpdateAppointmentCommand,
  ): Promise<{ scheduledDate: string }> {
    const { metadata, appointmentId, id, ...rest } = command;
    const updateDate = Object.fromEntries(
      Object.entries(rest).filter(([_, v]) => v != null || v !== undefined),
    );

    if (rest.date && isBeforeToday(rest.date))
      throw new BadRequestException('Invalid new Appointment Date');

    const findAppointment = await this.repository.findById(appointmentId);

    if (!findAppointment) throw new BadRequestException('Resource not found');
    const response = await this.repository.update(
      { ...updateDate, date: rest.date ? new Date(rest.date) : undefined },
      appointmentId,
    );

    return { scheduledDate: response.date.toISOString() };
  }
}
