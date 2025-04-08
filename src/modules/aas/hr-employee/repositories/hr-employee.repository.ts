import { Injectable } from '@nestjs/common';
import { HrEmployee } from '../entities/hr-employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseEnum } from '~/common/enums';

@Injectable()
export class HrEmployeeRepository extends Repository<HrEmployee> {
  constructor(
    @InjectRepository(HrEmployee, DatabaseEnum.AAS_DATABASE)
    private readonly repository: Repository<HrEmployee>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
