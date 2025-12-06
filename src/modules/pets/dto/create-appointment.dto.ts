import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  @IsIn(['bath', 'surgery', 'vet_consultation', 'vaccine'])
  service: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsString()
  @MaxLength(1000)
  @ApiProperty()
  notes: string;
}
