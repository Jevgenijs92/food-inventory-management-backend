import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UnitsOfMeasurement {
  KG = 'kg',
  PCS = 'pcs',
  L = 'l',
}

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
  @IsEnum(UnitsOfMeasurement, {
    message: (validationArguments) =>
      'unitOfMeasurement should be a valid enum value: ' +
      Object.values(validationArguments.constraints?.[0]).join(', '),
  })
  readonly unitOfMeasurement: UnitsOfMeasurement;
}
