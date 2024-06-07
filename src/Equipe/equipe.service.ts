import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EquipeEntity } from "./equipe.entity";
import { Repository } from "typeorm";

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(EquipeEntity)
    private equipeRepository: Repository<EquipeEntity>,
  ) {}


  findAll() {
    return this.equipeRepository.find({
      relations: { pilotos: true ,
        carros:true
      },
    });
  }

  async findById(id: string): Promise<EquipeEntity> {
    const findOne = await this.equipeRepository.findOne({ where: { id } });
    if (!findOne) {
      throw new NotFoundException('Equipe não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.equipeRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: EquipeEntity) {
    const newEquipe = this.equipeRepository.create(dto);
    return this.equipeRepository.save(newEquipe);
  }

  async update({ id, ...dto }: EquipeEntity) {
    await this.findById(id);
    return this.equipeRepository.save({ id, ...dto });
  }




}