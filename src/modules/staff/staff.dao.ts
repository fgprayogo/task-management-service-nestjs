import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateStaffDto } from './dto/staff.dto';

@Injectable()
export class StaffDao {
  constructor(private prisma: PrismaService) {}

  async createStaff(createStaff: CreateStaffDto) {
    try {
      return await this.prisma.staff.create({ data: createStaff });
    } catch (error) {
      await this.catchPrismaCreateError(error, createStaff.email);
    }
  }

  async getStaffByEmail(email: string) {
    try {
      return await this.prisma.staff.findUniqueOrThrow({ where: { email } });
    } catch (error) {
      await this.catchPrismaFindError(error, email);
    }
  }

  private async catchPrismaFindError(error: any, email: string) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      // P2025: The record with the specified email was not found
      throw new NotFoundException(`Staff with EMAIL ${email} not found.`);
    }
    // If it's not a known Prisma error or not related to record not found, re-throw the original error
    throw error;
  }

  private async catchPrismaCreateError(error: any, email: string) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // P2002: The record with the specified email already exist
      throw new ForbiddenException(`Staff with EMAIL ${email} already exist`);
    }
    // If it's not a known Prisma error or not related to record not found, re-throw the original error
    throw error;
  }
}
