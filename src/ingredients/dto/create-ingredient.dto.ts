import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  readonly pricePerPackaging: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  readonly quantityPerPackaging: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly unitOfMeasurement: string;
}
