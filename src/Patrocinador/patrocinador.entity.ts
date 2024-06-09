import { EquipeEntity } from "src/Equipe/equipe.entity";
import { PilotoEntity } from "src/Piloto/piloto.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'patrocinador' })
export class PatrocinadorEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false ,length: 7  })
    nome: string;


    @ManyToMany(() => EquipeEntity, (equipe) => equipe.patrocinadores)
    equipes: EquipeEntity[]

    @ManyToMany(() => PilotoEntity, (piloto) => piloto.patrocinadores)
    pilotos: PilotoEntity[]



}