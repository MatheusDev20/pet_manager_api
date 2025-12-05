/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './query';
import { UserRepository } from '../../repository/user-repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetMeQuery)
export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetMeQuery) {
    const { userId } = query;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...data } = user;

    return data;
  }
}
