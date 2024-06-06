import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PilotoService } from "./piloto.service";
import { PilotoEntity } from "./piloto.entity";

@Controller('pilotos')
export class PilotoController {
  constructor(private pilotoService: PilotoService) {}

  @Get()
  findAll() {
    return this.pilotoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pilotoService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pilotoService.remove(id);
  }

  @Post()
  create(@Body() piloto: PilotoEntity) {
    return this.pilotoService.create(piloto);
  }

}