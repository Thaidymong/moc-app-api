import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { HrEmployeeService } from './hr-employee.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HrEmployeesPageOptionsDto } from './dto/hr-employees-input.dto';
import { HrEmployeesResponseDto } from './dto/hr-employee-response.dto';

@ApiTags('HR Employees')
@Controller({
  version: '1',
  path: 'hr-employees',
})
export class HrEmployeeController {
  constructor(private readonly hrEmployeeService: HrEmployeeService) {}

  @Get('/')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all employees',
    description: 'Get all employees',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all employees',
    type: HrEmployeesResponseDto,
  })
  async findHrEmployees(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: HrEmployeesPageOptionsDto,
  ): Promise<HrEmployeesResponseDto> {
    return await this.hrEmployeeService.findAll(pageOptionsDto);
  }
}
