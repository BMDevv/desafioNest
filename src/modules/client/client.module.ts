import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AirTag } from '../airTag/models/airTag.entity';
import { Rental } from '../rentals/models/rental.entity';
import { Client } from './models/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, AirTag, Rental])],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
