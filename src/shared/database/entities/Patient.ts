import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
  
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id?: number;

  @Column()
  nombre: string;
  
  @Column()
  fechaNacimiento: Date;
  
  @Column({
    nullable: true
  })
  telefono?: string;
  
  @Column({
    nullable: true
  })
  correo?: string;
  
  @Column({
    default: 0
  })
  peso: number = 0;
  
  @Column({
    default: 0
  })
  talla: number = 0;
  
  @Column({
    default: 0
  })
  perimetroCefalico: number = 0;
  
  @Column({
    default: 0
  })
  presionArterial: number = 0;
}