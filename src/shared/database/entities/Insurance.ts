import { InsuranceType } from './InsuranceType';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './../../interfaces/BaseEntity';

@Entity()
export class Insurance extends BaseEntity {
  @Column({
    type: 'varchar',
    length: '255',
  })
  name: string;

  @ManyToMany(() => InsuranceType)
  @JoinTable()
  types: InsuranceType[];
}