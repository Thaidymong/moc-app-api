import { Module } from '@nestjs/common';
import { HrEmployeeService } from './hr-employee.service';
import { HrEmployeeController } from './hr-employee.controller';
import { HrEmployeeRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrEmployee } from './entities';
import { HrDepartment } from '../hr-department/entities';
import { DatabaseEnum } from '~/common/enums';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [HrEmployee, HrDepartment],
      DatabaseEnum.AAS_DATABASE,
    ),
  ],
  controllers: [HrEmployeeController],
  providers: [HrEmployeeService, HrEmployeeRepository],
})
export class HrEmployeeModule {}
