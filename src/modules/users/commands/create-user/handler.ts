/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './command';
import { UserRepository } from '../../repository/user-repository';
import { BadRequestException } from '@nestjs/common';
import { EncryptService } from 'src/modules/auth/hashing';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
  constructor(
    private repository: UserRepository,
    private readonly encrypt: EncryptService,
  ) {}

  async execute(command: CreateUserCommand): Promise<{ id: string }> {
    const { metadata, id, ...userData } = command;

    const { email } = userData;
    const user = await this.repository.findByEmail(email);

    if (user) throw new BadRequestException('Email Already Taken');
    const encryptedPassword = await this.encrypt.hash(userData.password);

    const { id: newId } = await this.repository.create({
      ...userData,
      password: encryptedPassword,
    });

    return { id: newId };
  }
}
