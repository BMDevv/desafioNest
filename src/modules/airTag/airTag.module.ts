import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { AirTagController } from './airTag.controller';
import { AirTagService } from './airTag.service';
import { AirTag } from './models/airTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirTag]), ClientModule],
  providers: [AirTagService],
  controllers: [AirTagController],
  exports: [AirTagService], 
})
export class AirTagModule {}
