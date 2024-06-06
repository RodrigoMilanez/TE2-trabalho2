import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarroEntity } from "./carro.entity";
import { CarroService } from "./carro.service";
import { CarroController } from "./carro.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CarroEntity])],
    controllers: [CarroController],
    providers: [CarroService],
  })
  export class CarroModule {}