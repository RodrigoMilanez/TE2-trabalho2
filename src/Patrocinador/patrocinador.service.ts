import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PilotoEntity } from "src/Piloto/piloto.entity";
import { PatrocinadorEntity } from "./patrocinador.entity";
import { Repository } from "typeorm";

@Injectable()
export class PatrocinadorService {
  constructor(
    @InjectRepository(PatrocinadorEntity)
    private patrocinadorRepository: Repository<PatrocinadorEntity>,
  ) {}
  private contadorPilotosAtivos: number;

  findAll() {
    return this.patrocinadorRepository.find({
      relations: { pilotos: true ,
        equipes:true
      },
    });
  }

  async findById(id: string): Promise<PatrocinadorEntity> {
    const findOne = await this.patrocinadorRepository.findOne({ where: { id } });
    if (!findOne) {
      throw new NotFoundException('Patrocinador não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.patrocinadorRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PatrocinadorEntity) {
    const newPatrocinador = this.patrocinadorRepository.create(dto);
    return this.patrocinadorRepository.save(newPatrocinador);
  }


  async update({ id, ...dto }: PatrocinadorEntity) {
    await this.findById(id);
    return this.patrocinadorRepository.save({ id, ...dto });
  }

  


}