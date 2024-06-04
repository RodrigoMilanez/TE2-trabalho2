import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'equipes' })
export class EquipeEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    chassi: string;

    @Column({ type: 'date', name: 'data_fundacao', nullable: true })
    dataFundacao: Date;

    @Column({ nullable: false ,length: 7  })
    placa: string;



}