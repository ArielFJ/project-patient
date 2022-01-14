import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  headCircunference: number = 0;

  @Column({
    type: 'int',
    default: 0
  })
  bloodPressure: number = 0;

  static Empty: Patient = {
    name: '',
    email: '',
    birthDate: new Date(),
    bloodPressure: 0,
    headCircunference: 0,
    height: 0,
    weight: 0
  };
}
