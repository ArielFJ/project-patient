import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../interfaces/BaseEntity';

@Entity()
export class InsuranceType extends BaseEntity {
  @Column({
    type: 'varchar',
    length: '255',
  })
  name: string;
}