import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EquipeEntity } from "./equipe.entity";
import { Repository } from "typeorm";
import { EquipeDto } from "./equipe.dto";
import { PilotoEntity } from "src/Piloto/piloto.entity";

@Injectable()
export class EquipeService {
  constructor(
    @InjectRepository(EquipeEntity)
    private equipeRepository: Repository<EquipeEntity>,
  ) {}
  private contadorPilotosAtivos: number;

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

  async create(dto: EquipeDto) {
    const newEquipe = this.equipeRepository.create(dto);
    return this.equipeRepository.save(newEquipe);
  }


  async update({ id, ...dto }: EquipeEntity) {
    await this.findById(id);
    return this.equipeRepository.save({ id, ...dto });
  }

  public async validaCapacidade(piloto: PilotoEntity){
    const findById = await this.findById(piloto.equipe.id);
    

    if (findById.pilotosAtivos <= 2) {
      this.contadorPilotosAtivos++; // Incrementar o contador
      findById.pilotosAtivos++;
      this.update(findById); // Atualizar a equipe no banco de dados
      console.log(findById);
    } else {
      throw new BadRequestException('Equipe já tem a capacidade máxima de pilotos ativos');
    }

  }

  public async diminuiCapacidade(piloto: PilotoEntity){
    const findById = await this.findById(piloto.equipe.id);
    if (findById.pilotosAtivos > 0) {
      findById.pilotosAtivos--;
      this.update(findById);
      console.log(findById);
    }
  }


}