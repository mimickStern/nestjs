import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    foodtype: string;

    @IsNotEmpty()
    animal: string;
}

