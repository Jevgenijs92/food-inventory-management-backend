import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerPackaging: {
    type: Number,
    required: true,
    get: (v: number) => v / 100,
    set: (v: number) => v * 100,
  },
  quantityPerPackaging: {
    type: Number,
    required: true,
  },
  unitOfMeasurement: {
    type: String,
    required: true,
  },
});
