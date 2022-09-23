import { Ingredient } from '../../ingredients';
import { LeanDocument } from 'mongoose';

export interface Product extends Document {
  id: string;
  name: string;
  ingredients: {
    ingredient: LeanDocument<Ingredient>;
    quantity: number;
    price: number;
  }[];
  price: number;
}
