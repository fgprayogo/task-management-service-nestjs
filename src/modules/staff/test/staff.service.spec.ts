import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { StaffDao } from '../staff.dao';
import { StaffService } from '../staff.service';
import { staffStub } from './stubs/staff.stub';
import { Role } from '../dto/staff.dto';

describe('StaffService', () => {
  let staffService: StaffService;
  let staffDao: StaffDao;

  beforeEach(async () => {
    const staffDaoMock = {
      createStaff: jest.fn().mockResolvedValue(staffStub()),
      getStaffByEmail: jest.fn().mockResolvedValue(staffStub()),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(StaffDao)
      .useValue(staffDaoMock)
      .compile();

    staffService = module.get<StaffService>(StaffService);
    staffDao = module.get<StaffDao>(StaffDao);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const payload = {
          email: staffStub().email,
          password: staffStub().password,
          name: staffStub().name,
          role: Role.ADMIN,
        };
        const result = await staffService.create(payload);
        expect(result).toBeDefined();
        expect(result).toEqual(staffStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await staffService.findOne(staffStub().email);
        expect(result).toBeDefined();
        expect(result).toEqual(staffStub());
      });
    });
  });
});
