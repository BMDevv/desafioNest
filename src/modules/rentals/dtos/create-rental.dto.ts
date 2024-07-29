import { IsInt } from 'class-validator';

export class CreateRentalDto {
  @IsInt()
  readonly clientId: number;

  @IsInt()
  readonly airTagId: number;
}
