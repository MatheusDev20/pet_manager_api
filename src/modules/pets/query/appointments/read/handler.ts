import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ReadAppointmentsQueryCommand } from './query';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';

@QueryHandler(ReadAppointmentsQueryCommand)
@Injectable()
export class ReadAppointmentsService implements IQueryHandler<ReadAppointmentsQueryCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: ReadAppointmentsQueryCommand): Promise<any> {
    const { ownerId, dateFilter, serviceFilter, petId } = command;

    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      select: { ownerId: true },
    });

    if (!pet) throw new ForbiddenException('Pet not found');

    if (pet.ownerId !== ownerId)
      throw new ForbiddenException('You do not own this pet.');

    const whereClause: any = {
      petId,
      ...(serviceFilter ? { service: serviceFilter } : {}),
      ...(dateFilter
        ? {
            date: {
              gte: startOfDay(new Date(dateFilter)),
              lte: endOfDay(new Date(dateFilter)),
            },
          }
        : {}),
    };

    const appointments = await this.prisma.appointment.findMany({
      where: whereClause,
      orderBy: { date: 'asc' },
    });

    return {
      total: appointments.length,
      items: appointments,
    };
  }
}
