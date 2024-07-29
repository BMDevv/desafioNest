import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirTagService } from '../airTag/airTag.service';
import { ClientService } from '../client/client.service';
import { Rental } from './models/rental.entity';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { EndRentalDto } from './dtos/end-rental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    private clientService: ClientService,
    private airTagService: AirTagService,
  ) {}

  async startRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const client = await this.clientService.findOne(createRentalDto.clientId);
    const airTag = await this.airTagService.findOne(createRentalDto.airTagId);

    if (!client || !airTag) {
      throw new NotFoundException('Client or AirTag not found');
    }

    if (airTag.client) {
      throw new BadRequestException('AirTag is already rented');
    }

    airTag.client = client;
    await this.airTagService.update(airTag.id, airTag);

    const rental = new Rental();
    rental.client = client;
    rental.airTag = airTag;

    return this.rentalRepository.save(rental);
  }

  async endRental(endRentalDto: EndRentalDto): Promise<Rental> {
    const airTag = await this.airTagService.findOne(endRentalDto.airTagId);

    if (!airTag || !airTag.client) {
      throw new NotFoundException('AirTag is not rented');
    }

    const rental = await this.rentalRepository.findOne({
      where: {
        airTag: { id: endRentalDto.airTagId },
        client: { id: endRentalDto.clientId },
        returnedAt: null,
      },
      order: {
        id: 'DESC',
      },
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const now = new Date();

    rental.returnedAt = now;
    rental.amountDue = this.calculateAmountDue(rental.rentedAt, now);
    
    airTag.client = null;
    await this.airTagService.update(airTag.id, airTag);

    return this.rentalRepository.save(rental);
  }

  private calculateAmountDue(rentedAt: Date, returnedAt: Date): number {
    const durationInMinutes =
      (rentedAt.getTime() - returnedAt.getTime()) / 60000;
    return Number((durationInMinutes * 0.52).toFixed(2));
  }
}
