import { BaseEntity } from '../../interfaces/BaseEntity';
import { Patient } from './Patient';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Consultation extends BaseEntity {
  constructor(reason = '', treatment?: string, diagnosis?: string) {
    super();
    this.reason = reason;
    this.date = new Date();
    this.treatment = treatment;
    this.diagnosis = diagnosis;
  }

  @Column('varchar')
  reason: string;

  @Column('date')
  date: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  treatment?: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  diagnosis?: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @Column({
    type: 'boolean',
    default: false
  })
  attended: boolean;

  // eslint-disable-next-line
  @ManyToOne((type) => Patient, (patient) => patient.consultations)
  patient?: Patient;

  static CreateEmpty = (): Consultation => {
    return {
      reason: '',
      date: new Date(),
      isActive: true,
      attended: false
    };
  };
}
