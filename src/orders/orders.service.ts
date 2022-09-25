import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_MODEL } from '../common';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_MODEL) private orderModel: Model<Order>, private productsService: ProductsService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.convertToOrder(createOrderDto);
      return new this.orderModel(order).save();
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not create order');
    }
  }

  async findAll() {
    return this.orderModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.orderModel.findById(id).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not find order');
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    const updateOrder = await this.convertToOrder(updateOrderDto);
    try {
      Object.assign(order, updateOrder);
      await order?.save();
      return this.findOne(id);
    } catch (exception) {
      console.log(exception);
      throw new InternalServerErrorException('Could not update order');
    }
  }

  async remove(id: string) {
    try {
      await this.orderModel.deleteOne({ _id: id }).orFail().exec();
    } catch (exception) {
      console.log(exception);
      throw new NotFoundException('Could not delete order');
    }
  }

  private async convertToOrder(orderDto: CreateOrderDto | UpdateOrderDto) {
    if (orderDto?.products) {
      const productsDto = orderDto.products;
      const products = await Promise.all(productsDto.map((product) => this.productsService.findOne(product.id)));
      return {
        deliveryDate: orderDto.deliveryDate,
        products: products.map((product) => ({
          ...product,
          deliveryQuantity: productsDto.find((productDto) => productDto.id === product.id.toString())?.deliveryQuantity,
        })),
      };
    }
    return orderDto;
  }
}
