import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { TaskService } from '../task.service';
import { TaskDao } from '../task.dao';
import { taskStub } from './stubs/task.stub';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskDao: TaskDao;

  beforeEach(async () => {
    const taskDaoMock = {
      createTask: jest.fn().mockResolvedValue(taskStub()),
      getTaskById: jest.fn().mockResolvedValue(taskStub()),
      updateTask: jest.fn().mockResolvedValue(taskStub()),
      deleteTask: jest.fn().mockResolvedValue(taskStub()),
      getAllTask: jest.fn().mockResolvedValue([taskStub()]),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(TaskDao)
      .useValue(taskDaoMock)
      .compile();

    taskService = module.get<TaskService>(TaskService);
    taskDao = module.get<TaskDao>(TaskDao);
    module.close();
  });

  describe('create', () => {
    describe('when create is called', () => {
      test('should return a new record if successful', async () => {
        const result = await taskService.create(taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('assignTask', () => {
    describe('when assignTask is called', () => {
      test('should return a record if successful', async () => {
        let defaultData = taskStub();
        defaultData.is_completed = false;
        jest.spyOn(taskDao, 'getTaskById').mockResolvedValue(defaultData);
        const result = await taskService.assignTask(1, taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
  describe('markTaskAsComplete', () => {
    describe('when markTaskAsComplete is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskService.markTaskAsComplete(1, taskStub());
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
  describe('remove', () => {
    describe('when remove is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskService.remove(1);
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskService.findAll();
        expect(result).toBeDefined();
        expect(result).toEqual([taskStub()]);
      });
    });
  });
  describe('findOne', () => {
    describe('when findOne is called', () => {
      test('should return a record if successful', async () => {
        const result = await taskService.findOne(1);
        expect(result).toBeDefined();
        expect(result).toEqual(taskStub());
      });
    });
  });
});
