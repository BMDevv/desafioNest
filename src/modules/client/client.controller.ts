import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './models/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';
import { handleException } from 'src/utils/exception-handler.util';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() client: CreateClientDto): Promise<Client> {
    try {
      return this.clientService.create(client);
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  findAll(): Promise<{ client: Client; debt: number }[]> {
    try {
      return this.clientService.findAllCLients();
    } catch (error) {
      handleException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    try {
      return this.clientService.findOne(+id);
    } catch (error) {
      handleException(error);
    }
  }
}
