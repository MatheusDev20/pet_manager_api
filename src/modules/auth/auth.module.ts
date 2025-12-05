import { forwardRef, Module } from '@nestjs/common';
import { EncryptService } from './hashing';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/secrets';
import { CookiesUtils } from './cookies';
import { AuthController } from './commands/login/controller';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginService } from './commands/login/handler';
import { JwtUtils } from './jwt';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    JwtUtils,
    EncryptService,
    JwtConfigService,
    CookiesUtils,
  ],
  exports: [EncryptService, JwtConfigService, JwtUtils, CookiesUtils],
})
export class AuthModule {}
