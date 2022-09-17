import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../constants';
import { DatabaseConfigurationService } from '../config';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (
      databaseConfigService: DatabaseConfigurationService,
    ): Promise<typeof mongoose> =>
      mongoose
        .set('toJSON', {
          transform: (_, value) => {
            value.id = value._id;
            delete value._id;
            delete value.__v;
          },
        })
        .connect(databaseConfigService.uri),
    inject: [DatabaseConfigurationService],
  },
];
