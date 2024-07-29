import { IsInt } from 'class-validator';

export class EndRentalDto {
  @IsInt()
  readonly airTagId: number;

  @IsInt()
  readonly clientId: number;
}
