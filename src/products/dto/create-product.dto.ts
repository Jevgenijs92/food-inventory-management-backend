import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class IngredientDto {
  @IsNotEmpty()
  ingredient: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto;
}
