import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { AssignTaskDto, CreateTaskDto, MarkTaskAsCompleteDto, UpdateTaskDto } from './dto/task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Task } from '@prisma/client';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @HttpCode(201)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Patch('assign/:id')
  @HttpCode(200)
  assign(@Param('id') id: string, @Body() assignTaskData: AssignTaskDto): Promise<Task> {
    return this.taskService.assignTask(+id, assignTaskData);
  }

  @Patch('complete/:id')
  @HttpCode(200)
  markTaskAsComplete(@Param('id') id: string, @Body() markTaskAsCompleteData: MarkTaskAsCompleteDto): Promise<Task> {
    return this.taskService.markTaskAsComplete(+id, markTaskAsCompleteData);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.remove(+id);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(+id);
  }
}
