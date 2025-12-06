/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/modules/users/repository/user-repository';
import { PetsRepository } from '../../../repository/pets.repository';
import { NotFoundException } from '@nestjs/common';
import { DeleteAppointmentCommand } from './command';
import { AppointmentsRepository } from 'src/modules/pets/repository/appointment.repository';

@CommandHandler(DeleteAppointmentCommand)
export class DeleteAppointmentService {
  constructor(private appointmentRepository: AppointmentsRepository) {}
  async execute(command: DeleteAppointmentCommand): Promise<{ id: string }> {
    const { id, metadata, appointmentId, ownerId } = command;

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) throw new NotFoundException('Resource not Found');

    const { id: deletedAppointment } =
      await this.appointmentRepository.delete(appointmentId);

    return { id: deletedAppointment };
  }
}
