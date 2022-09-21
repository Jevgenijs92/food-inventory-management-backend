import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        autopopulate: true,
      },
      quantity: Number,
    },
  ],
});
