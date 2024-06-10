import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarroEntity } from "./carro.entity";
import { EquipeService } from "src/Equipe/equipe.service";
import { PilotoService } from "src/Piloto/piloto.service";

@Injectable()
export class CarroService {
  constructor(
    @InjectRepository(CarroEntity)
    private carroRepository: Repository<CarroEntity>,
    private equipeService: EquipeService,
    private readonly pilotoService: PilotoService
  ) {}

   novaPlaca: string;

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

  async findByNumber(chassi: number): Promise<CarroEntity> {
    const findOne = await this.carroRepository.findOne({ where: { chassi }, relations: { equipe: true
     }, });
    if (!findOne) {
      throw new NotFoundException('Piloto não encontrado com o chassi ' + chassi);
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
    const findById = await this.findById(id);
    this.validaPiloto(dto,findById);
    return this.carroRepository.save({ id, ...dto });
  }

  private validaPiloto(novoCarro , carro){
    const piloto= this.pilotoService.findById(novoCarro.piloto.id);
    if(novoCarro.piloto.equipe = novoCarro.equipe ) {
      this.AlteraPlaca(novoCarro,carro);
      console.log("+++++")
    } else{
      throw new BadRequestException('O piloto e o carro devem pertencer a mesma equipe');
    }
  }
  private AlteraPlaca(novoCarro , carro){
    const equipe= this.equipeService.findById(novoCarro.equipe.id);
    const piloto= this.pilotoService.findById(novoCarro.piloto.id);
    this.novaPlaca = String(novoCarro.chassi) + String(novoCarro.equipe.numero) + String(novoCarro.piloto.numero);
    novoCarro.placa = this.novaPlaca;
  }

}