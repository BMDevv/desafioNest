import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirTag } from './models/airTag.entity';
import { CreateAirTagDto } from './dtos/create-airTag.dto';
import { UpdateAirTagDto } from './dtos/update-airTag.dto';

@Injectable()
export class AirTagService {
  constructor(
    @InjectRepository(AirTag)
    private airTagRepository: Repository<AirTag>,
  ) {}

  findAll(): Promise<AirTag[]> {
    return this.airTagRepository.find({ relations: ['client'] });
  }

  findOne(id: number): Promise<AirTag> {
    return this.airTagRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async create(airTag: CreateAirTagDto): Promise<AirTag> {
    const existingAirTag = await this.airTagRepository.findOne({
      where: { macAddress: airTag.macAddress },
    });
    if (existingAirTag) {
      throw new BadRequestException('macAddress already in use');
    }
   
    return this.airTagRepository.save(airTag);
  }

  async update(id: number, airTag: UpdateAirTagDto): Promise<AirTag> {
    await this.airTagRepository.update(id, airTag);
    return this.findOne(id);
  }


}
