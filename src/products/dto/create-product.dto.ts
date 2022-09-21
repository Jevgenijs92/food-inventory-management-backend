import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  ingredients: {
    ingredient: string;
    quantity: number;
  };

  @IsOptional()
  price: number;
}
