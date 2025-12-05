import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '../../../generated/prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<{ id: string }> {
    const user = await this.prisma.user.create({ data });
    return { id: user.id };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    console.log('Finding user by ID:', id);
    return this.prisma.user.findUnique({ where: { id } });
  }
}
