import { IsString, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDTO {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  reason: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes: string;
}
