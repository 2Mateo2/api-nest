import { Injectable, ConflictException } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductTypesService {

  constructor(
    @InjectRepository(ProductType)
    private productoRepository: Repository<ProductType>,
  ){

  }
  async create(createProductTypeDto: CreateProductTypeDto) {
    const { description } = createProductTypeDto;
    // Verificar si la descripción ya existe en la base de datos
    const existingProductType = await this.productoRepository.findOne({
      where: { description },
    });
    if (existingProductType) {
      throw new ConflictException('La descripción ya existe');
    }
    const newProductType = this.productoRepository.create(createProductTypeDto);
    await this.productoRepository.save(newProductType);
    return 'The Product Type has been created';
  }

  findAll() {
    return this.productoRepository.find();
  }

  findBy(id: number) {
    return this.productoRepository.findBy({id:id})
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    this.productoRepository.update(id, updateProductTypeDto)
    return 'The Product Type has been updated'
  }

  async remove(id: number) {
    const existingProductType = await this.findBy(id);
    // Marcar como eliminado estableciendo la fecha y hora actual en cada entidad
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.productoRepository.save(existingProductType);
    return 'The Product Types have been marked as deleted';
  }
  
  
}
