import { forwardRef, Module } from '@nestjs/common';
import { CreateUserController } from './commands/create-user/controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repository/user-repository';
import { CreateUserService } from './commands/create-user/handler';
import { AuthModule } from '../auth/auth.module';
import { GetMeController } from './query/me/controller';
import { GetMeService } from './query/me/handler';

@Module({
  imports: [CqrsModule, forwardRef(() => AuthModule)],
  controllers: [CreateUserController, GetMeController],
  providers: [UserRepository, CreateUserService, GetMeService],
  exports: [UserRepository],
})
export class UserModule {}
