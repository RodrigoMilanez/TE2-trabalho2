import { EquipeEntity } from "src/Equipe/equipe.entity";
import { PilotoEntity } from "src/Piloto/piloto.entity";
import { StatusEnum } from "src/statusEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => EquipeEntity, (equipe) => equipe.carros)
    equipe: EquipeEntity


    @OneToOne(() => PilotoEntity)
    @JoinColumn()
    piloto: PilotoEntity
    

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.INATIVO,
        nullable: true,
      })
      status: StatusEnum;



}