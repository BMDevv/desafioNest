import { IsString } from 'class-validator';

export class CreateAirTagDto {
  @IsString()
  readonly macAddress: string;

  @IsString()
  readonly name: string;
}
