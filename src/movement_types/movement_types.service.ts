
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMovementTypeDto } from './dto/create-movement_type.dto';
import { UpdateMovementTypeDto } from './dto/update-movement_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementType } from './entities/movement_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementTypesService {

  constructor(
    @InjectRepository(MovementType)
    private movenTRepository: Repository<MovementType>,
  ){
    
  }

  async onModuleInit() {
    const existingRecords = await this.movenTRepository.count();

    if (existingRecords === 0) {
      await this.create({ description: 'Ingreso' });
      await this.create({ description: 'Salida' });
    }
  }

  async create(createMovementTypeDto: CreateMovementTypeDto) {
    const { description } = createMovementTypeDto;
    const existingMovementype = await this.movenTRepository.findOne({
      where: { description },
    });
    if (existingMovementype) {
      throw new ConflictException('La descripción ya existe');
    }
    const newProductType = this.movenTRepository.create(createMovementTypeDto);
    await this.movenTRepository.save(newProductType);
    return 'The movement_type Type has been created';
  }


  findAll() {
    return this.movenTRepository.find();
  }

  findBy(id: number) {
    return this.movenTRepository.findBy({id:id});
  }

  update(id: number, updateMovementTypeDto: UpdateMovementTypeDto) {
    return this.movenTRepository.update(id, updateMovementTypeDto);
  }

  async remove(id: number) {
    const existingProductType = await this.findBy(id);
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.movenTRepository.save(existingProductType);
    return 'The Movement Types have been marked as deleted';
  }

}
