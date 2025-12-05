import { Module } from '@nestjs/common';
import { CreateUserController } from './commands/create-user/controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repository/user-repository';
import { CreateUserService } from './commands/create-user/handler';

@Module({
  imports: [CqrsModule],
  controllers: [CreateUserController],
  providers: [UserRepository, CreateUserService],
})
export class UserModule {}
