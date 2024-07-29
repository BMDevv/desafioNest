import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { ClientModule } from '../client/client.module';
import { AirTagModule } from '../airTag/airTag.module';
import { Rental } from './models/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), ClientModule, AirTagModule],
  providers: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
