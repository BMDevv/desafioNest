import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Rental } from './models/rental.entity';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { EndRentalDto } from './dtos/end-rental.dto';
import { handleException } from 'src/utils/exception-handler.util';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('start')
  startRental(@Body() startRentalDto: CreateRentalDto): Promise<Rental> {
    try {
      return this.rentalService.startRental(startRentalDto);
    } catch (error) {
      handleException(error);
    }
  }

  @Put('end')
  endRental(@Body() endRentalDto: EndRentalDto): Promise<Rental> {
    try {
      return this.rentalService.endRental(endRentalDto);
    } catch (error) {
      handleException(error);
    }
  }
}
