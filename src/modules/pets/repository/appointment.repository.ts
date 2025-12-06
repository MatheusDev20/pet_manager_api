import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/generated/prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AppointmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'petId'>,
    petId: string,
  ): Promise<{ date: string; id: string }> {
    const result = await this.prisma.appointment.create({
      data: {
        ...data,
        pet: {
          connect: { id: petId },
        },
      },
    });

    return { date: result.date.toISOString(), id: result.id };
  }

  async update(fields: Partial<Appointment>, id: string): Promise<Appointment> {
    const result = await this.prisma.appointment.update({
      where: { id },
      data: { ...fields },
    });

    return result;
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({ where: { id } });
  }
}
