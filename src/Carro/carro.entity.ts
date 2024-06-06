import { PilotoEntity } from "src/Piloto/piloto.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carro' })
export class CarroEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique : true})
    chassi: string;

    @Column({ type: 'date', name: 'data_fabricacao', nullable: true })
    fabricacao: Date;

    @Column({ nullable: false ,length: 7  })
    placa: string;

    

     /**
      * Piloto
      * 
      * Equipe
      * 
      * Status
     */



}