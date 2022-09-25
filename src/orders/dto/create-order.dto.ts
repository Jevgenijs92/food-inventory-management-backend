import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderProduct {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  deliveryQuantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  deliveryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: OrderProduct[];
}
