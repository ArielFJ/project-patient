import { Consultation } from './Consultation';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id?: number;

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
    consultations: []
  };
}
