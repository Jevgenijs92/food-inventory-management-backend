import { DATABASE_CONNECTION, PRODUCT_MODEL } from '../common';
import { Connection } from 'mongoose';
import { ProductsSchema } from './schemas';

export const productsProviders = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductsSchema),
    inject: [DATABASE_CONNECTION],
  },
];
