import { Controller } from '@nestjs/common';
import { HrDepartmentService } from './hr-department.service';

@Controller('hr-department')
export class HrDepartmentController {
  constructor(private readonly hrDepartmentService: HrDepartmentService) {}
}
