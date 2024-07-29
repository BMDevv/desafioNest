import { Client } from 'src/modules/client/models/client.entity';
import { Rental } from 'src/modules/rentals/models/rental.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AirTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  macAddress: string;

  @Column()
  name: string;

  @ManyToOne(() => Client, client => client.airTags, { nullable: true })
  client: Client;

  @OneToMany(() => Rental, rental => rental.airTag)
  rentals: Rental[];
}
