import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { StaffService } from './staff/staff.service';
import { StaffDao } from './staff/staff.dao';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { TaskDao } from './task/task.dao';

@Module({
  imports: [],
  controllers: [AuthController, TaskController],
  providers: [
    AuthService,
    StaffService,
    StaffDao,
    TaskService,
    TaskDao,
    PrismaService,
  ],
})
export class IndexModule {}
