import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    name: 'id',
    type: 'number',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    name: 'created_at',
    type: 'string',
  })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    name: 'updated_at',
    type: 'string',
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
