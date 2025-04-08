import { Injectable, NotFoundException } from '@nestjs/common';
import { HrEmployeeRepository } from './repositories';
import { HrEmployeesPageOptionsDto } from './dto/hr-employees-input.dto';
import { PageMetaDto } from '~/common/dto';
import {
  HrEmployeeResponseDto,
  HrEmployeesResponseDto,
} from './dto/hr-employee-response.dto';

@Injectable()
export class HrEmployeeService {
  constructor(private readonly hrEmployeeRepository: HrEmployeeRepository) {}

  async findOneById(id: number) {
    const HrEmployee = await this.hrEmployeeRepository.findOne({
      where: { id },
    });

    if (!HrEmployee) {
      throw new NotFoundException('User not found');
    }

    return new HrEmployeeResponseDto('Get User successfully', HrEmployee);
  }

  async findOneByEmail(email: string): Promise<HrEmployeeResponseDto> {
    const HrEmployee = await this.hrEmployeeRepository.findOne({
      where: { username: email },
    });

    if (!HrEmployee) {
      throw new NotFoundException('User not found');
    }

    return new HrEmployeeResponseDto('Get User successfully', HrEmployee);
  }

  async findAll(
    pageOptionsDto: HrEmployeesPageOptionsDto,
  ): Promise<HrEmployeesResponseDto> {
    const [HrEmployees, itemCount] =
      await this.hrEmployeeRepository.findAndCount({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        order: {
          createdAt: pageOptionsDto.order,
        },
      });

    const pageMetaResponseDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new HrEmployeesResponseDto(
      'Get all HrEmployees successfully',
      HrEmployees,
      pageMetaResponseDto,
    );
  }
}
