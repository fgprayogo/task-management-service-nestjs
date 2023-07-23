import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { TaskService } from '../task.service';
import { TaskController } from '../task.controller';
import { taskStub } from './stubs/task.stub';

describe('TaskController', () => {
  let taskService: TaskService;
  let taskController: TaskController;

  beforeEach(async () => {
    const taskServiceMock = {
      create: jest.fn().mockResolvedValue(taskStub()),
      assignTask: jest.fn().mockResolvedValue(taskStub()),
      markTaskAsComplete: jest.fn().mockResolvedValue(taskStub()),
      remove: jest.fn().mockResolvedValue(taskStub()),
      findAll: jest.fn().mockResolvedValue([taskStub()]),
      findOne: jest.fn().mockResolvedValue(taskStub()),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(TaskService)
      .useValue(taskServiceMock)
      .compile();

    taskService = module.get<TaskService>(TaskService);
    taskController = module.get<TaskController>(TaskController);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const result = await taskController.create(taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('assign', () => {
    describe('when assign is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskController.assign('1', taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('complete', () => {
    describe('when complete is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskController.markTaskAsComplete('1', taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      test('should return a record that has been deleted if successful', async () => {
        const result = await taskController.remove('1');
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('should return all task if successful', async () => {
        const result = await taskController.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([taskStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskController.findOne('1');
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
});
