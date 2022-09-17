import { DATABASE_CONNECTION, INGREDIENT_MODEL } from '../common';
import { Connection } from 'mongoose';
import { IngredientSchema } from './schemas/ingredient.schema';

export const ingredientsProviders = [
  {
    provide: INGREDIENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Ingredient', IngredientSchema),
    inject: [DATABASE_CONNECTION],
  },
];
