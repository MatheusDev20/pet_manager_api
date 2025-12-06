/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '../create/command';
import { BadRequestException } from '@nestjs/common';
import { isBeforeToday } from 'src/shared/date';
import { PetsRepository } from 'src/modules/pets/repository/pets.repository';
import { AppointmentsRepository } from 'src/modules/pets/repository/appointment.repository';

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentService {
  constructor(
    private readonly repository: AppointmentsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute(command: CreateAppointmentCommand): Promise<{ date: string }> {
    const { date, metadata, id, petId, ...rest } = command;

    if (isBeforeToday(date))
      throw new BadRequestException('Invalid Appointment Date');

    const pet = await this.petRepository.findById(petId);
    if (!pet) throw new BadRequestException('Resource not found');

    const { date: appointmentDate } = await this.repository.create(
      { ...rest, date: new Date(date) },
      command.petId,
    );

    return { date: appointmentDate };
  }
}
