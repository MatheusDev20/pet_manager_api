import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDTO {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  reason: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  date: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  notes: string;
}
