import { Module } from '@nestjs/common';
import { HrDepartmentService } from './hr-department.service';
import { HrDepartmentController } from './hr-department.controller';

@Module({
  controllers: [HrDepartmentController],
  providers: [HrDepartmentService],
})
export class HrDepartmentModule {}
