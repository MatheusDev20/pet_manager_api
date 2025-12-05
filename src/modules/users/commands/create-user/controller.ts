import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserCommand } from './command';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from 'src/config/app.routes';
import { CreateUserDTO } from '../../dto/create-user-dto';
import { HttpResponse, ok } from 'src/shared/http-response-helpers';

@Controller(routesV1.version)
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root)
  async create(
    @Body() body: CreateUserDTO,
  ): Promise<HttpResponse<{ id: string }>> {
    const command = new CreateUserCommand({ ...body });

    const { id } = await this.commandBus.execute<
      CreateUserCommand,
      { id: string }
    >(command);

    return ok({ id });
  }
}
