
import { ProductType } from "src/product-types/entities/product-type.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, RelationId } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => ProductType, (product_type) => product_type.product)
    @JoinColumn({ name: 'product_type_id' })
    product_type: ProductType

    @RelationId((product: Product) => product.product_type)
    @Column({ type: 'integer' })
    product_type_id:number;

    @Column()
    description:string;

    @Column({default:0})
    quantity:number

    @CreateDateColumn()
    create_at

    @UpdateDateColumn()
    update_at

    @DeleteDateColumn()
    deleted_at
}