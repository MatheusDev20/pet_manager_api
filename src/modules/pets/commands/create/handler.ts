/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { CreatePetCommand } from './command';
import { UserRepository } from 'src/modules/users/repository/user-repository';
import { PetsRepository } from '../../repository/pets.repository';

@CommandHandler(CreatePetCommand)
export class CreatePetService {
  constructor(
    private userRepository: UserRepository,
    private petsRepository: PetsRepository,
  ) {}
  async execute(command: CreatePetCommand): Promise<{ id: string }> {
    const { id, metadata, ...petData } = command;

    const { ownerId, ...data } = petData;
    const owner = await this.userRepository.findById(ownerId);

    if (!owner) throw new Error('Owner not found');

    const { id: newPetId } = await this.petsRepository.create(data, owner);
    return { id: newPetId };
  }
}
