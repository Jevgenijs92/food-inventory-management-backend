import { DATABASE_CONNECTION, PRODUCT_MODEL } from '../common';
import { Connection } from 'mongoose';
import { ProductsSchema } from './schemas/products.schema';

export const productsProviders = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) => {
      return connection.model('Product', ProductsSchema);
    },
    inject: [DATABASE_CONNECTION],
  },
];
