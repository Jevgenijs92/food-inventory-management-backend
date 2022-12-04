import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/auth/decorators/user-id.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @UserId() userId: string) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get()
  async findAll(@UserId() userId: string) {
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.ordersService.findOne(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @UserId() userId: string) {
    return this.ordersService.update(id, updateOrderDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserId() userId: string) {
    return this.ordersService.remove(id, userId);
  }
}
