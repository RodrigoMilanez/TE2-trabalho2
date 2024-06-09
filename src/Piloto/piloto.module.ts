import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PilotoEntity } from "./piloto.entity";
import { PilotoService } from "./piloto.service";
import { PilotoController } from "./piloto.controller";
import { EquipeService } from "src/Equipe/equipe.service";
import { EquipeEntity } from "src/Equipe/equipe.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PilotoEntity, EquipeEntity])],
    controllers: [PilotoController],
    providers: [PilotoService, EquipeService],
  })
  export class PilotoModule {}