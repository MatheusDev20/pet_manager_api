import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePetController } from './commands/create/controller';
import { UserModule } from '../users/users.module';
import { CreatePetService } from './commands/create/handler';
import { PetsRepository } from './repository/pets.repository';
import { AuthModule } from '../auth/auth.module';
import { UpdatePetController } from './commands/update/controller';
import { UpdatePetService } from './commands/update/handler';
import { ReadPetsController } from './query/read/controller';
import { ReadPetsService } from './query/read/handler';
import { DeletePetController } from './commands/delete/controller';
import { DeletePetService } from './commands/delete/handler';

@Module({
  imports: [CqrsModule, UserModule, AuthModule],
  controllers: [
    CreatePetController,
    UpdatePetController,
    ReadPetsController,
    DeletePetController,
  ],
  providers: [
    CreatePetService,
    PetsRepository,
    UpdatePetService,
    DeletePetService,
    ReadPetsService,
  ],
})
export class PetsModule {}
