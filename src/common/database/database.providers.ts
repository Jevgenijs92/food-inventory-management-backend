import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../constants';
import { DatabaseConfigurationService } from '../config';
import { ToObjectOptions } from 'mongoose';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (databaseConfigService: DatabaseConfigurationService): Promise<typeof mongoose> =>
      mongoose
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .plugin(require('mongoose-autopopulate'))
        .set('toJSON', toObjectOptions)
        .set('toObject', toObjectOptions)
        .connect(databaseConfigService.uri),
    inject: [DatabaseConfigurationService],
  },
];

const toObjectOptions: ToObjectOptions = {
  getters: true,
  virtuals: true,
  versionKey: false,
  transform: (_, value) => {
    value.id = value._id;
    delete value._id;
  },
};
