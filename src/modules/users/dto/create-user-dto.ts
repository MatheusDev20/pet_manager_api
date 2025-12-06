import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password: string;
}
