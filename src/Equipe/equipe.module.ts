import { Module } from "@nestjs/common";
import { EquipeEntity } from "./equipe.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EquipeController } from "./equipe.controller";
import { EquipeService } from "./equipe.service";

@Module({
    imports: [TypeOrmModule.forFeature([EquipeEntity])],
    controllers: [EquipeController],
    providers: [EquipeService],
  })
  export class EquipeModule {}