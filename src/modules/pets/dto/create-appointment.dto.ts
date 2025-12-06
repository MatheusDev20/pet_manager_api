import { IsString, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @MaxLength(1000)
  notes: string;
}
