import { AirTag } from 'src/modules/airTag/models/airTag.entity';
import { Rental } from 'src/modules/rentals/models/rental.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => AirTag, airTag => airTag.client)
  airTags: AirTag[];

  @OneToMany(() => Rental, rental => rental.client)
  rentals: Rental[];
}
