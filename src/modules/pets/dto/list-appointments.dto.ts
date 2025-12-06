import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsIn, IsDateString } from 'class-validator';
import { SERVICES } from 'src/shared/constants';

export class ReadAppointmentsQueryDTO {
  @IsOptional()
  @ApiProperty({ enum: SERVICES })
  @IsIn(SERVICES)
  serviceFilter?: string;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  dateFilter?: string;
}
