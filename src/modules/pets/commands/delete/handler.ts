/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/modules/users/repository/user-repository';
import { PetsRepository } from '../../repository/pets.repository';
import { NotFoundException } from '@nestjs/common';
import { DeleteCommand } from './command';

@CommandHandler(DeleteCommand)
export class DeletePetService {
  constructor(private petsRepository: PetsRepository) {}
  async execute(command: DeleteCommand): Promise<{ id: string }> {
    const { id, metadata, ...petData } = command;

    const { petId } = petData;

    const pet = await this.petsRepository.findById(petId);
    if (!pet) throw new NotFoundException('Resource not Found');

    const { id: deletedPetId } = await this.petsRepository.delete(petId);

    return { id: deletedPetId };
  }
}
