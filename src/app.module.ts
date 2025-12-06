import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './modules/auth/auth.module';
import { PetsModule } from './modules/pets/pets.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CqrsModule,
    UserModule,
    PetsModule,
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
