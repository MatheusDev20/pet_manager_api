import { IsNotEmpty, IsNumber, Max, MaxLength } from 'class-validator';

export class CreatePetDTO {
  @MaxLength(40)
  @IsNotEmpty()
  name: string;

  @MaxLength(40)
  @IsNotEmpty()
  specie: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(25)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @MaxLength(255)
  @IsNotEmpty()
  notes: string;
}
