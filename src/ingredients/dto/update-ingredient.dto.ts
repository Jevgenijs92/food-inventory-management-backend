import { IsOptional } from 'class-validator';

export class UpdateIngredientDto {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly price: number;

  @IsOptional()
  readonly unit: string;

  @IsOptional()
  readonly pricePerUnit: number;
}
