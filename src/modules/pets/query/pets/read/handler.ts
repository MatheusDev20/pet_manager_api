import { QueryHandler } from '@nestjs/cqrs';
import { PetsRepository } from '../../../repository/pets.repository';
import { ReadMyPetsQuery } from './query';
import { Pet } from 'src/generated/prisma/client';

@QueryHandler(ReadMyPetsQuery)
export class ReadPetsService {
  constructor(private petsRepository: PetsRepository) {}
  async execute(query: ReadMyPetsQuery): Promise<{ pets: Pet[] }> {
    const { ownerId } = query;
    const pets = await this.petsRepository.readByOwnerId(ownerId);

    return { pets };
  }
}
