import { Patient } from './Patient';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consultation {

  @PrimaryGeneratedColumn()
  id?: number;

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

  @ManyToOne(type => Patient, patient => patient.consultations)
  patient: Patient;
}