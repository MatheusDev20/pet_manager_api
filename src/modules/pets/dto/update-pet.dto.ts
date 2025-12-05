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
  name: string;

  @IsOptional()
  @MaxLength(40)
  specie: string;

  @IsOptional()
  @IsNumber()
  @Max(25)
  age: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @MaxLength(255)
  @IsNotEmpty()
  notes: string;
}
