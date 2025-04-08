import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

import { HealthService } from './health.service';
import { Public } from '~/common/decorators';

@ApiTags('Health')
@Controller({
  version: '1',
  path: 'health',
})
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Public()
  @Get('/')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Health Check',
  })
  @HealthCheck()
  check() {
    return this.healthService.check();
  }
}
