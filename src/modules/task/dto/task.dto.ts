import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';

export class CreateTaskDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  staff_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_assigned: boolean;

  @IsOptional()
  @IsBoolean()
  is_completed: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class AssignTaskDto {
  @IsNumber()
  @Type(() => Number)
  staff_id: number;

  @IsOptional()
  @IsBoolean()
  is_assigned: boolean;

  @IsOptional()
  updated_at: Date;
}

export class MarkTaskAsCompleteDto {
  @IsNotEmpty()
  @Transform(({ value} ) => value === 'true')
  @IsBoolean()
  is_completed: boolean;

  @IsOptional()
  updated_at: Date;
}
