import { Test, TestingModule } from '@nestjs/testing';
import { UsersMigrateDataController } from './users-migrate-data.controller';
import { UsersMigrateDataService } from './users-migrate-data.service';

describe('UsersMigrateDataController', () => {
  let controller: UsersMigrateDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMigrateDataController],
      providers: [UsersMigrateDataService],
    }).compile();

    controller = module.get<UsersMigrateDataController>(UsersMigrateDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
