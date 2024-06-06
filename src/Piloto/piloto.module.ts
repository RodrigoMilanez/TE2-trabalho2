import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PilotoEntity } from "./piloto.entity";
import { PilotoService } from "./piloto.service";
import { PilotoController } from "./piloto.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PilotoEntity])],
    controllers: [PilotoController],
    providers: [PilotoService],
  })
  export class PilotoModule {}