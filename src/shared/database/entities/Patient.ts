import { Consultation } from './Consultation';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../interfaces/BaseEntity';

@Entity()
export class Patient extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column({
    type: 'date'
  })
  birthDate: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 15
  })
  phone?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255
  })
  email?: string;

  @Column({
    type: 'int',
    default: 0
  })
  weight: number = 0;

  @Column({
    type: 'int',
    default: 0
  })
  height: number = 0;

  @Column({
    type: 'int',
    default: 0
  })
  headCircumference: number = 0;

  @Column({
    type: 'int',
    default: 0
  })
  bloodPressure: number = 0;

  @Column({
    default: true
  })
  isActive: boolean;

  // eslint-disable-next-line
  @OneToMany(type => Consultation, consultation => consultation.patient)
  consultations: Consultation[];

  static Empty: Patient = {
    name: '',
    email: '',
    phone: '',
    birthDate: new Date(),
    bloodPressure: 0,
    headCircumference: 0,
    height: 0,
    weight: 0,
    isActive: true,
    consultations: []
  };
}
