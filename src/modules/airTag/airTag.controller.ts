import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AirTagService } from './airTag.service';
import { AirTag } from './models/airTag.entity';
import { CreateAirTagDto } from './dtos/create-airTag.dto';
import { UpdateAirTagDto } from './dtos/update-airTag.dto';
import { handleException } from 'src/utils/exception-handler.util';

@Controller('airtags')
export class AirTagController {
  constructor(private readonly airTagService: AirTagService) {}

  @Get()
  findAll(): Promise<AirTag[]> {
    try {
      return this.airTagService.findAll();
    } catch (error) {
      handleException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AirTag> {
    try {
      return this.airTagService.findOne(+id);
    } catch (error) {
      handleException(error);
    }
  }

  @Post()
  create(@Body() airTag: CreateAirTagDto): Promise<AirTag> {
    try {
      return this.airTagService.create(airTag);
    } catch (error) {
      handleException(error);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() airTag: UpdateAirTagDto,
  ): Promise<AirTag> {
    try {
      return this.airTagService.update(+id, airTag);
    } catch (error) {
      handleException(error);
    }
  }
}
