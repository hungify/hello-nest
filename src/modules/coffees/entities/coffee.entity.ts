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
  id: number;

  @Column()
  name: string;

  @Column()
  brands: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // if we delete a coffee, we want to delete all the flavors associated with it
  })
  flavors: Flavor[];
}
