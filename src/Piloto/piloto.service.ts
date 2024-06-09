import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PilotoEntity } from "./piloto.entity";
import { Repository } from "typeorm";
import { StatusEnum } from "src/statusEnum";
import { EquipeService } from "src/Equipe/equipe.service";

@Injectable()
export class PilotoService {
  constructor(
    @InjectRepository(PilotoEntity)
    private pilotoRepository: Repository<PilotoEntity>,
    private equipeService: EquipeService
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

  async findByNumber(numero: number): Promise<PilotoEntity> {
    const findOne = await this.pilotoRepository.findOne({ where: { numero }, relations: { equipe: true,
      carro:true
     }, });
    if (!findOne) {
      throw new NotFoundException('Piloto não encontrado com o numero ' + numero);
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
    const findById = await this.findById(id);
    this.validaAtividade(dto,findById);
    this.validaAtividadeInativa(dto,findById);
    return this.pilotoRepository.save({ id, ...dto });
  }

  private validaAtividadeInativa(novoPiloto , piloto){
    
    if(piloto.status == StatusEnum.ATIVO && novoPiloto.status == StatusEnum.INATIVO) {
      console.log("diminuindo")
      this.equipeService.diminuiCapacidade(novoPiloto);
    } 
  }

  private validaAtividade(novoPiloto , piloto){
    
    if(piloto.status == StatusEnum.INATIVO && novoPiloto.status == StatusEnum.ATIVO) {
      if (novoPiloto.equipe==null) {
        throw new BadRequestException('O piloto deve ter estar vinculado a uma equipe para ser ativado');
      } else if(novoPiloto.carro==null){
        throw new BadRequestException('O piloto deve ter um carro para ser ativado');
      }
      this.equipeService.validaCapacidade(novoPiloto);
    } 
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