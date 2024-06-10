import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PilotoEntity } from "./piloto.entity";
import { PilotoService } from "./piloto.service";
import { PilotoController } from "./piloto.controller";
import { EquipeModule } from "src/Equipe/equipe.module";

@Module({
    imports: [TypeOrmModule.forFeature([PilotoEntity]), EquipeModule],
    controllers: [PilotoController],
    providers: [PilotoService],
    exports: [PilotoService],
  })
  export class PilotoModule {}