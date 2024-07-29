import { IsOptional, IsString } from 'class-validator';

export class UpdateAirTagDto {
  @IsOptional()
  @IsString()
  readonly macAddress?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;
}
