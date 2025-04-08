import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HrDepartment } from '../entities/hr-department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseEnum } from '~/common/enums';

@Injectable()
export class HrDepartmentRepository extends Repository<HrDepartment> {
  constructor(
    @InjectRepository(HrDepartment, DatabaseEnum.AAS_DATABASE)
    private readonly repository: Repository<HrDepartment>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
