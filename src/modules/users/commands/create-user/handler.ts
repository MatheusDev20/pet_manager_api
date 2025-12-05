/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './command';
import { UserRepository } from '../../repository/user-repository';
// import { HttpException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
  constructor(private repository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<{ id: string }> {
    const { metadata, id, ...userData } = command;

    // const { email } = userData;
    // // const existingUser = await this.userRepository.findByEmail(email);

    // if (existingUser)
    //   throw new HttpException('User with this email already exists', 400);

    // const user = new User({ ...userData, addresses });;

    const { id: newId } = await this.repository.create(userData);

    return { id: newId };
  }
}
