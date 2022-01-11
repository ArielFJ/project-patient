import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
  
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id?: number;

  @Column()
  name: string;
  
  @Column()
  birthDate: Date;
  
  @Column({
    nullable: true
  })
  phone?: string;
  
  @Column({
    nullable: true
  })
  email?: string;
  
  @Column({
    default: 0
  })
  weight: number = 0;
  
  @Column({
    default: 0
  })
  height: number = 0;
  
  @Column({
    default: 0
  })
  headCircunference: number = 0;
  
  @Column({
    default: 0
  })
  bloodPressure: number = 0;
}