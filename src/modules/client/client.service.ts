import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../rentals/models/rental.entity';
import { Client } from './models/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });
    if (existingClient) {
      throw new BadRequestException('Email already in use');
    }

    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async findAllCLients(): Promise<{ client: Client; debt: number }[]> {
    const clients = await this.clientRepository.find({
      relations: ['airTags'],
    });

    const result = [];
    for (const client of clients) {
      const debt = await this.getClientDebt(client.id);
      result.push({ client, debt });
    }

    return result;
  }

  private async getClientDebt(clientId: number): Promise<number> {
    const rentals = await this.rentalRepository.find({
      where: { client: { id: clientId } },
      relations: ['client'],
    });

    return rentals.reduce(
      (total, rental) => total + Number(rental.amountDue),
      0,
    );
  }
}
