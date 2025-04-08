import { ApiProperty } from '@nestjs/swagger';
import { HrEmployee } from '../entities';
import { PageMetaDto } from '~/common/dto';

export class HrEmployeesResponseDto {
  @ApiProperty({
    title: 'Message',
    type: 'string',
    default: 'Success',
  })
  readonly message: string;

  @ApiProperty({
    type: HrEmployee,
    isArray: true,
    default: [],
  })
  readonly data: HrEmployee[];

  @ApiProperty({
    type: PageMetaDto,
  })
  readonly meta: PageMetaDto;

  constructor(message: string, data: HrEmployee[], meta: PageMetaDto) {
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

export class HrEmployeeResponseDto {
  @ApiProperty({
    title: 'Message',
    type: 'string',
    default: 'Success',
  })
  readonly message: string;

  @ApiProperty({
    type: HrEmployee,
  })
  readonly data: HrEmployee;

  constructor(message: string, data: HrEmployee) {
    this.message = message;
    this.data = data;
  }
}
