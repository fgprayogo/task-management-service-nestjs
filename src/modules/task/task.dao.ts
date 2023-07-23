import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskDao {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskData: CreateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.create({ data: createTaskData });
    } catch (error) {
      await this.catchPrismaCreateError(error, createTaskData.title);
    }
  }

  async getAllTask(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    try {
      return await this.prisma.task.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.update({ where: { id }, data });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      await this.catchPrismaFindError(error, id);
    }
  }

  private async catchPrismaFindError(error: any, id: number) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      throw new NotFoundException(`Task with ID ${id} cannot assigned to non-existing staff ID`);
    }
    throw error;
  }

  private async catchPrismaCreateError(error: any, email: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ForbiddenException(`Task with EMAIL ${email} already exist`);
    }
    throw error;
  }
}
