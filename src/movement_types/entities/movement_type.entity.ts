
import { Movement } from "src/movement/entities/movement.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";

@Entity()
export class MovementType {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    description:string

    @CreateDateColumn()
    create_at

    @UpdateDateColumn()
    update_at

    @DeleteDateColumn()
    deleted_at

    @OneToMany(() => Movement, (movement) => movement.movement_type)
    movement: Movement[]
}
