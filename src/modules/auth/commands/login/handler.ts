/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './commands';
import { UserRepository } from 'src/modules/users/repository/user-repository';
import { UnauthorizedException } from '@nestjs/common';
import { EncryptService } from '../../hashing';
import { JwtUtils } from '../../jwt';

@CommandHandler(LoginCommand)
export class LoginService implements ICommandHandler<LoginCommand> {
  constructor(
    private repository: UserRepository,
    private readonly hash: EncryptService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<{ accessToken: string; expiresIn: string }> {
    const { metadata, id, ...loginData } = command;
    const { email, password } = loginData;

    const user = await this.repository.findByEmail(email);
    if (!user) throw new UnauthorizedException(`Invalid Credentials`);

    const isValid = await this.hash.compare(password, user.password);

    if (!isValid) throw new UnauthorizedException(`Invalid credentials`);

    const { access_token, expiration } = await this.jwtUtils.generate({
      sub: user.id,
      username: user.firstName,
    });

    return {
      accessToken: access_token,
      expiresIn: expiration,
    };
  }
}
