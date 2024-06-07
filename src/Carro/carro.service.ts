import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarroEntity } from "./carro.entity";

@Injectable()
export class CarroService {
  constructor(
    @InjectRepository(CarroEntity)
    private carroRepository: Repository<CarroEntity>,
  ) {}


  findAll() {
    return this.carroRepository.find({
      relations: { equipe: true ,
        piloto: true
      }
    });
  }

  async findById(id: string): Promise<CarroEntity> {
    const findOne = await this.carroRepository.findOne({ where: { id } });
    if (!findOne) {
      throw new NotFoundException('Equipe não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.carroRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: CarroEntity) {
    const newEquipe = this.carroRepository.create(dto);
    return this.carroRepository.save(newEquipe);
  }

  async update({ id, ...dto }: CarroEntity) {
    await this.findById(id);
    return this.carroRepository.save({ id, ...dto });
  }




}