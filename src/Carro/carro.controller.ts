import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarroEntity } from "./carro.entity";
import { CarroService } from "./carro.service";

@Controller('carros')
export class CarroController {
  constructor(private carroService: CarroService) {}

  @Get()
  findAll() {
    return this.carroService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.carroService.findById(id);
  }

  @Get('chassi/:chassi') // Rota com parâmetro 'nome'
  findByNumero(@Param('chassi') chassi: number) {
    return this.carroService.findByNumber( chassi );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carroService.remove(id);
  }

  @Post()
  create(@Body() carro: CarroEntity) {
    return this.carroService.create(carro);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() carro: CarroEntity) {
    return this.carroService.update({ id, ...carro });
  }

}