import { IsDate } from "class-validator";
import { CarroEntity } from "src/Carro/carro.entity";
import { EquipeEntity } from "src/Equipe/equipe.entity";
import { PatrocinadorEntity } from "src/Patrocinador/patrocinador.entity";
import { StatusEnum } from "src/statusEnum";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    numero: number;//fazer exception para iguais

    @ManyToOne(() => EquipeEntity, (equipe) => equipe.pilotos)
    equipe: EquipeEntity

    @OneToOne(() => CarroEntity, (carro) => carro.piloto) 
    carro: CarroEntity

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.INATIVO,
        nullable: true,
      })
      status: StatusEnum;


      @ManyToMany(() => PatrocinadorEntity, (patrocinador) => patrocinador.pilotos)
      @JoinTable({
        name: 'pilotos_patrocinadores',
        joinColumn: { name: 'piloto_id' },
        inverseJoinColumn: { name: 'patricinador_id' },
      })
      patrocinadores: PatrocinadorEntity[];    
}