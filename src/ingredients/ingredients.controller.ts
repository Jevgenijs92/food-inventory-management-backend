import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/auth/decorators/user-id.decorator';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto, @UserId() userId: string) {
    return this.ingredientsService.create(createIngredientDto, userId);
  }

  @Get()
  async findAll(@UserId() userId: string) {
    return this.ingredientsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.ingredientsService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto, @UserId() userId: string) {
    return this.ingredientsService.update(id, updateIngredientDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserId() userId: string) {
    return this.ingredientsService.remove(id, userId);
  }
}
