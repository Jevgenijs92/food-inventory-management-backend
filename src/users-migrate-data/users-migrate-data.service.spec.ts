import { Test, TestingModule } from '@nestjs/testing';
import { UsersMigrateDataService } from './users-migrate-data.service';

describe('UsersMigrateDataService', () => {
  let service: UsersMigrateDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMigrateDataService],
    }).compile();

    service = module.get<UsersMigrateDataService>(UsersMigrateDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
