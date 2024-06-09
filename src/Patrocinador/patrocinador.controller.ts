import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatrocinadorEntity } from "./patrocinador.entity";
import { PatrocinadorService } from "./patrocinador.service";

@Controller('patrocinadores')
export class PatrocinadorController {
  constructor(private patrocinadorService: PatrocinadorService) {}

  @Get()
  findAll() {
    return this.patrocinadorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.patrocinadorService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patrocinadorService.remove(id);
  }

  @Post()
  create(@Body() dto: PatrocinadorEntity) {
    return this.patrocinadorService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PatrocinadorEntity) {
    return this.patrocinadorService.update({ id, ...dto });
  }
}