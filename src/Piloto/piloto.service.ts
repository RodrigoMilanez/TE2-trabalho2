import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
      relations: { equipe: true,
        carro:true
       },
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

  async create(piloto: PilotoEntity) {
    const newPiloto = this.pilotoRepository.create(piloto);

    this.validatePilotoNascimento(piloto);

    return this.pilotoRepository.save(newPiloto);
  }

  async update({ id, ...dto }: PilotoEntity) {
    await this.findById(id);
    return this.pilotoRepository.save({ id, ...dto });
  }

  private validatePilotoNascimento(piloto: PilotoEntity) {
    const dataAtual = new Date();
    const dataNascimento = new Date(piloto.dataNasc);
    const diferencaAno =
      dataAtual.getUTCFullYear() - dataNascimento.getUTCFullYear();
    if (diferencaAno < 21) {
      throw new BadRequestException('O piloto deve ter no mínimo 21 anos');
    } else if (diferencaAno === 21) {
      const meses =
        dataAtual.getUTCMonth() + 1 - (dataNascimento.getUTCMonth() + 1);
      if (meses < 0) {
        throw new BadRequestException(
          `O autor deve ter no mínimo 21 anos (faltam ainda ${meses * -1} mes(es))`,
        );
      } else if (dataAtual.getUTCMonth() - dataNascimento.getUTCMonth() === 0) {
        const dias = dataAtual.getUTCDate() - dataNascimento.getUTCDate();
        if (dias < 0) {
          throw new BadRequestException(
            `O piloto deve ter no mínimo 21 anos (faltam ainda ${dias * -1} dia(s))`,
          );
        }
      }
    }
  }
}