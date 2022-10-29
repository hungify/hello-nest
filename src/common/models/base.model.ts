import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseEntity, Column } from 'typeorm';

export abstract class BaseModel extends BaseEntity {
  @ApiProperty({ description: 'createdAt' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  createdAt?: Date;

  @ApiProperty({ description: 'updatedAt' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({ description: 'createdBy' })
  @Column({ nullable: true })
  @Expose()
  createdBy?: string;
}
