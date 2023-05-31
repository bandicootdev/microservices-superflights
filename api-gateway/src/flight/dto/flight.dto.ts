import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FlightDto {
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;

  @IsNotEmpty()
  @IsString()
  readonly airplane: string;

  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly flightDate: Date;
}
