import { ForbiddenException, Injectable } from '@nestjs/common';
import { AssignTaskDto, CreateTaskDto, MarkTaskAsCompleteDto, UpdateTaskDto } from './dto/task.dto';
import { TaskDao } from './task.dao';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private taskDao: TaskDao) {}

  async create(createTaskData: CreateTaskDto): Promise<Task> {
    return await this.taskDao.createTask(createTaskData);
  }

  async assignTask(id: number, assignTaskData: AssignTaskDto): Promise<Task> {
    const taskData = await this.taskDao.getTaskById(id);
    if (taskData.is_completed) {
      throw new ForbiddenException('Task already completed');
    }
    assignTaskData.is_assigned = true;
    assignTaskData.updated_at = new Date(Date.now());
    return await this.taskDao.updateTask(id, assignTaskData);
  }

  async markTaskAsComplete(id: number, markTaskAsCompleteData: MarkTaskAsCompleteDto): Promise<Task> {
    const taskData = await this.taskDao.getTaskById(id);
    if (!taskData.is_assigned) {
      throw new ForbiddenException('Task not assigned yet');
    }
    markTaskAsCompleteData.updated_at = new Date(Date.now());
    return await this.taskDao.updateTask(id, markTaskAsCompleteData);
  }

  async remove(id: number): Promise<Task> {
    return await this.taskDao.deleteTask(id);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskDao.getAllTask();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskDao.getTaskById(id);
  }
}
