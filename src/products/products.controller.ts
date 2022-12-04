import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/auth/decorators/user-id.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @UserId() userId: string) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  async findAll(@UserId() userId: string) {
    return this.productsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.productsService.findOne(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UserId() userId: string) {
    return this.productsService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserId() userId: string) {
    return this.productsService.remove(id, userId);
  }
}
