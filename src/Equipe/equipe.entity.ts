import { PilotoEntity } from "src/Piloto/piloto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'equipes' })
export class EquipeEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    nome: string;

    @Column({ type: 'date', name: 'data_fundacao', nullable: true })
    dataFundacao: Date;

   
    @Column({ nullable: false ,unique: true})
    numero: number;

    @Column({ length: 100 })
    origem: string;

    @OneToMany(() => PilotoEntity, (piloto) => piloto.equipe)
    pilotos: PilotoEntity[]
    
    /**
     carro

     capacidade
     */

}