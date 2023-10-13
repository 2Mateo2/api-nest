import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovementTypesService } from './movement_types.service';
import { CreateMovementTypeDto } from './dto/create-movement_type.dto';
import { UpdateMovementTypeDto } from './dto/update-movement_type.dto';

@Controller('movement-types')
export class MovementTypesController {
  constructor(private readonly movementTypesService: MovementTypesService) {}

  @Post()
  create(@Body() createMovementTypeDto: CreateMovementTypeDto) {
    return this.movementTypesService.create(createMovementTypeDto);
  }

  @Get()
  findAll() {
    return this.movementTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementTypesService.findBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovementTypeDto: UpdateMovementTypeDto) {
    return this.movementTypesService.update(+id, updateMovementTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementTypesService.remove(+id);
  }
}
