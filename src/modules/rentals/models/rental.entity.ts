import { AirTag } from 'src/modules/airTag/models/airTag.entity';
import { Client } from 'src/modules/client/models/client.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, client => client.rentals)
  client: Client;

  @ManyToOne(() => AirTag, airTag => airTag.rentals)
  airTag: AirTag;

  @CreateDateColumn()
  rentedAt: Date;

  @UpdateDateColumn({ nullable: true })
  returnedAt: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amountDue: number;
}
