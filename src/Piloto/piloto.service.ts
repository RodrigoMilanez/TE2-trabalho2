import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PilotoEntity } from "./piloto.entity";
import { Repository } from "typeorm";

@Injectable()
export class PilotoService {
  constructor(
    @InjectRepository(PilotoEntity)
    private pilotoRepository: Repository<PilotoEntity>,
  ) {}


  findAll() {
    return this.pilotoRepository.find({
      relations: { equipe: true },
    });
  }

  async findById(id: string): Promise<PilotoEntity> {
    const findOne = await this.pilotoRepository.findOne({ where: { id } });
    if (!findOne) {
      throw new NotFoundException('Piloto não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.pilotoRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PilotoEntity) {
    const newEquipe = this.pilotoRepository.create(dto);
    return this.pilotoRepository.save(newEquipe);
  }

  async update({ id, ...dto }: PilotoEntity) {
    await this.findById(id);
    return this.pilotoRepository.save({ id, ...dto });
  }




}