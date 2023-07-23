import { Injectable } from '@nestjs/common';
import { CreateStaffDto, Role } from './dto/staff.dto';
import { StaffDao } from './staff.dao';

@Injectable()
export class StaffService {
  constructor(private staffDao: StaffDao) {}
  create(createStaffData: CreateStaffDto) {
    return this.staffDao.createStaff(createStaffData);
  }

  findOne(email: string) {
    return this.staffDao.getStaffByEmail(email);
  }
}
