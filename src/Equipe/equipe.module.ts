import { Module } from "@nestjs/common";
import { EquipeEntity } from "./equipe.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([EquipeEntity])]
  })
  export class AutorModule {}