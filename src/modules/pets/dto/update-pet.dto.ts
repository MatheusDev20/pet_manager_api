import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
} from 'class-validator';

export class UpdatePetDTO {
  @MaxLength(40)
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @MaxLength(40)
  @ApiProperty()
  specie: string;

  @IsOptional()
  @IsNumber()
  @Max(25)
  @ApiProperty()
  age: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsOptional()
  @MaxLength(255)
  @IsNotEmpty()
  @ApiProperty()
  notes: string;
}
