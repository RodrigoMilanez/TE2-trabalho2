import { IsDate } from "class-validator";
import { CarroEntity } from "src/Carro/carro.entity";
import { EquipeEntity } from "src/Equipe/equipe.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pilotos' })
export class PilotoEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 100 })
    nome: string;

    @IsDate()
    @Column({ type: 'date', name: 'data_nasc', nullable: true })
    dataNasc: Date;

    @Column({ nullable: false ,unique: true})
    numero: number;

    @ManyToOne(() => EquipeEntity, (equipe) => equipe.pilotos)
    equipe: EquipeEntity

    
/**
    @OneToOne(() => CarroEntity)
    @JoinColumn()
    carro: CarroEntity

    
    Equipe

    carro

    status
     */
}