import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePetController } from './commands/pets/create/controller';
import { UserModule } from '../users/users.module';
import { CreatePetService } from './commands/pets/create/handler';
import { PetsRepository } from './repository/pets.repository';
import { AuthModule } from '../auth/auth.module';
import { UpdatePetController } from './commands/pets/update/controller';
import { UpdatePetService } from './commands/pets/update/handler';
import { ReadPetsController } from './query/pets/read/controller';
import { ReadPetsService } from './query/pets/read/handler';
import { DeletePetController } from './commands/pets/delete/controller';
import { DeletePetService } from './commands/pets/delete/handler';
import { AppointmentsRepository } from './repository/appointment.repository';
import { CreateAppointmentService } from './commands/appointments/create/handler';
import { UpdateAppointmentService } from './commands/appointments/update/handler';
import { CreateAppointmentController } from './commands/appointments/create/controller';
import { UpdateAppointmentController } from './commands/appointments/update/controller';
import { DeleteAppointmentController } from './commands/appointments/delete/controller';
import { DeleteAppointmentService } from './commands/appointments/delete/handler';
import { ReadAppointmentsController } from './query/appointments/read/controller';
import { ReadAppointmentsService } from './query/appointments/read/handler';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [CqrsModule, UserModule, AuthModule, EventsModule],
  controllers: [
    CreatePetController,
    UpdatePetController,
    ReadPetsController,
    DeletePetController,
    CreateAppointmentController,
    UpdateAppointmentController,
    DeleteAppointmentController,
    ReadAppointmentsController,
  ],
  providers: [
    CreatePetService,
    PetsRepository,
    UpdatePetService,
    DeletePetService,
    DeleteAppointmentService,
    ReadPetsService,
    AppointmentsRepository,
    CreateAppointmentService,
    UpdateAppointmentService,
    ReadAppointmentsService,
  ],
  exports: [PetsRepository],
})
export class PetsModule {}
