import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { MovementType } from 'src/movement_types/entities/movement_type.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>
  ){

  }
  // create(createMovementDto: CreateMovementDto) {
  //   return this.movementRepository.save([createMovementDto])
  // }

  async create(createMovementDto: CreateMovementDto) {
    const { product_id, movement_type_id } = createMovementDto;
    // Verificar si product_id existe en la tabla products
    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) {
      throw new BadRequestException('product_id no existe en la tabla products');
    }
    // Verificar si movement_type_id existe en la tabla movement_types
    const movementType = await this.movementTypeRepository.findOne({ where: { id: movement_type_id } });
    if (!movementType) {
      throw new BadRequestException('movement_type_id no existe en la tabla movement_types');
    }
    const newMovement = this.movementRepository.create(createMovementDto);
    newMovement.product = product;
    newMovement.movement_type = movementType;
    const movement = await this.movementRepository.save(newMovement);
    return 'The Movement has been created';
  }
  
  findAll() {
    return this.movementRepository.find();
  }

  findOne(id: number) {
    return this.movementRepository.findBy({id:id});
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    this.movementRepository.update(id, updateMovementDto)
    return `This action updates a #${id} product`;
  }
  async remove(id: number) {
    const existingProductType = await this.findOne(id);
    // Marcar como eliminado estableciendo la fecha y hora actual en cada entidad
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.movementRepository.save(existingProductType);
    return 'The Movement have been marked as deleted';
  }
  
}
