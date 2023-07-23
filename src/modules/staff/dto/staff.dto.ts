import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  role: Role;
}

export enum Role {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN",
}
