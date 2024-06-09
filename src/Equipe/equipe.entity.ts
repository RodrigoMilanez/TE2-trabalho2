import { IsInt, Max, Min, isInt } from "class-validator";
import { CarroEntity } from "src/Carro/carro.entity";
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

    
    @Column({ nullable: false ,  default: 0})
    @IsInt()
    @Min(0)
    @Max(2)
    pilotosAtivos: number;

    @Column({ nullable: false ,unique: true})
    numero: number; //fazer exception para iguais

    @Column({ length: 100 })
    origem: string;

    @OneToMany(() => PilotoEntity, (piloto) => piloto.equipe)
    pilotos: PilotoEntity[]
    
    @OneToMany(() => CarroEntity, (carro) => carro.equipe)
    carros: CarroEntity[]

    /**

     capacidade
     */

}