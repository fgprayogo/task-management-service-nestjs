import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { StaffDao } from '../staff.dao';
import { staffStub } from './stubs/staff.stub';
import { Role } from '../dto/staff.dto';

describe('StaffDao', () => {
  let prismaService: PrismaService;
  let staffDao: StaffDao;

  beforeEach(async () => {
    const prismaMock = {
      staff: {
        create: jest.fn().mockResolvedValue(staffStub()),
        findUniqueOrThrow: jest.fn().mockResolvedValue(staffStub()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    prismaService = module.get<PrismaService>(PrismaService);
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
        const result = await staffDao.createStaff(payload);
        expect(result).toBeDefined();
        expect(result).toEqual(staffStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await staffDao.getStaffByEmail(staffStub().email);
        expect(result).toBeDefined();
        expect(result).toEqual(staffStub());
      });
    });
  });
});
