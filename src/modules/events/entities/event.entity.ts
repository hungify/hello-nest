import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  readonly type: string;

  @Column()
  readonly name: string;

  @Column('json')
  readonly payload: Record<string, unknown>;
}
