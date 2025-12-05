import { Injectable } from '@nestjs/common';
import { Pet, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>,
    owner: User,
  ): Promise<{ id: string }> {
    const result = await this.prisma.pet.create({
      data: {
        ...data,
        owner: {
          connect: { id: owner.id },
        },
      },
    });

    return { id: result.id };
  }

  async findById(id: string): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  async readByOwnerId(ownerId: string): Promise<Pet[]> {
    return this.prisma.pet.findMany({ where: { ownerId } });
  }

  async update(fields: Partial<Pet>, id: string): Promise<{ id: string }> {
    const result = await this.prisma.pet.update({
      where: { id },
      data: { ...fields },
    });

    const { id: petId } = result;

    return { id: petId };
  }

  async delete(id: string): Promise<{ id: string }> {
    const result = await this.prisma.pet.delete({ where: { id } });
    return { id: result.id };
  }
}
