/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDTO } from '../../dto/create-user-dto';
import { CreateUserController } from '../create-user/controller';
import { CreateUserCommand } from '../create-user/command';
import { ok } from 'src/shared/http-response-helpers';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(CreateUserController);
    commandBus = module.get(CommandBus);
  });

  it('should create a user and return id', async () => {
    const dto: CreateUserDTO = {
      firstName: 'Matheus',
      lastName: 'De Paula',
      email: 'matheusdev20@gmail.com',
      password: '123456',
    };

    (commandBus.execute as jest.Mock).mockResolvedValue({ id: '123' });
    const command = new CreateUserCommand(dto);
    const result = await controller.create(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);

    expect(result).toEqual(ok({ id: '123' }));
  });
});
