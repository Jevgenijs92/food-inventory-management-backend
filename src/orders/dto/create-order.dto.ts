import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderProduct {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  deliveryQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellPrice: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  deliveryDate: Date;

  @ApiProperty()
  @IsOptional()
  documentNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: OrderProduct[];
}
