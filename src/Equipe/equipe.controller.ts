import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EquipeEntity } from "./equipe.entity";
import { EquipeService } from "./equipe.service";

@Controller('equipes')
export class EquipeController {
  constructor(private equipeService: EquipeService) {}

  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.equipeService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.remove(id);
  }

  @Post()
  create(@Body() dto: EquipeEntity) {
    return this.equipeService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: EquipeEntity) {
    return this.equipeService.update({ id, ...dto });
  }
}