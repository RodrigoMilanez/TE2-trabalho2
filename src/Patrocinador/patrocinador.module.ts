import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatrocinadorEntity } from "./patrocinador.entity";
import { PatrocinadorController } from "./patrocinador.controller";
import { PatrocinadorService } from "./patrocinador.service";

@Module({
    imports: [TypeOrmModule.forFeature([PatrocinadorEntity])],
    controllers: [PatrocinadorController],
    providers: [PatrocinadorService],
  })
  export class EquipeModule {}