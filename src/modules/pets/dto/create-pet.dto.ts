import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, MaxLength } from 'class-validator';

export class CreatePetDTO {
  @MaxLength(40)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MaxLength(40)
  @IsNotEmpty()
  @ApiProperty()
  specie: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(25)
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty()
  notes: string;
}
