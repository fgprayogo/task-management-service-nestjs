import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { TaskDao } from '../task.dao';
import { taskStub } from './stubs/task.stub';

describe('TaskDao', () => {
  let prismaService: PrismaService;
  let taskDao: TaskDao;

  beforeEach(async () => {
    const prismaMock = {
      task: {
        create: jest.fn().mockResolvedValue(taskStub()),
        findMany: jest.fn().mockResolvedValue([taskStub()]),
        findUniqueOrThrow: jest.fn().mockResolvedValue(taskStub()),
        update: jest.fn().mockResolvedValue(taskStub()),
        delete: jest.fn().mockResolvedValue(taskStub()),
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
    taskDao = module.get<TaskDao>(TaskDao);
    module.close();
  });

  describe('createTask', () => {
    describe('when createTask is called', () => {
      test('should return a new record if successful', async () => {
        const result = await taskDao.createTask(taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('getAllTask', () => {
    describe('when getAllTask is called', () => {
      test('should return all record if successful', async () => {
        const result = await taskDao.getAllTask();
        expect(result).toBeDefined();
        expect(result).toEqual([taskStub()]);
      });
    });
  });

  describe('getTaskById', () => {
    describe('when getTaskById is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskDao.getTaskById(1);
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
  describe('updateTask', () => {
    describe('when updateTask is called', () => {
      test('should return an updated record if successful', async () => {
        const result = await taskDao.updateTask(1, taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('deleteTask', () => {
    describe('when deleteTask is called', () => {
      test('should return the deleted record if successful', async () => {
        const result = await taskDao.deleteTask(1);
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
});
