import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // SQL table name will be 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly brands: string;

  @Column({ default: 0 })
  readonly recommendations: number;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // if we delete a coffee, we want to delete all the flavors associated with it
  })
  readonly flavors: Flavor[];
}
