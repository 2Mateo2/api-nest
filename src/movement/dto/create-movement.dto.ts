
import { IsNotEmpty } from "class-validator";

export class CreateMovementDto {
   @IsNotEmpty({message:"ingrese el dato"})
   product_id: number;
   movement_type_id: number;
   quantity: number;
}
