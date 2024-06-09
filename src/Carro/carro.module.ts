import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarroEntity } from "./carro.entity";
import { CarroService } from "./carro.service";
import { CarroController } from "./carro.controller";
import { EquipeEntity } from "src/Equipe/equipe.entity";
import { PilotoEntity } from "src/Piloto/piloto.entity";
import { EquipeService } from "src/Equipe/equipe.service";
import { PilotoService } from "src/Piloto/piloto.service";

@Module({
    imports: [TypeOrmModule.forFeature([CarroEntity, EquipeEntity, PilotoEntity])],
    controllers: [CarroController],
    providers: [CarroService, EquipeService, PilotoService],
  })
  export class CarroModule {}