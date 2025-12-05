/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/modules/users/repository/user-repository';
import { PetsRepository } from '../../repository/pets.repository';
import { UpdatedPetCommand } from './command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatedPetCommand)
export class UpdatePetService {
  constructor(
    private userRepository: UserRepository,
    private petsRepository: PetsRepository,
  ) {}
  async execute(command: UpdatedPetCommand): Promise<{ id: string }> {
    const { id, metadata, ...petData } = command;

    const { ownerId, petId, ...data } = petData;

    const pet = await this.petsRepository.findById(petId);
    if (!pet) throw new NotFoundException('Resource not Found');

    const owner = await this.userRepository.findById(ownerId);
    if (!owner) throw new NotFoundException('Resource Not Found');

    const { id: newPetId } = await this.petsRepository.update(data, petId);

    return { id: newPetId };
  }
}
