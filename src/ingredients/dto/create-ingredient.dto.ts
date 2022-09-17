import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly price: number = 0;

  @IsOptional()
  readonly unit: string;

  @IsOptional()
  readonly pricePerUnit: number = 0;
}
