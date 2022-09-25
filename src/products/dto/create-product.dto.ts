import { IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({ description: 'Existing ingredient id' })
  @IsNotEmpty()
  ingredient: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients?: IngredientDto;
}
