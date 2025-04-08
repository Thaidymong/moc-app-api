import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './authentication.controller';
import { HrEmployee } from '../aas/hr-employee/entities';
import { HrDepartment } from '../aas/hr-department/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseEnum } from '~/common/enums';
import { TokenService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { HrEmployeeService } from '../aas/hr-employee/hr-employee.service';
import { HashService } from '~/shared/hash/hash.service';
import { HrEmployeeRepository } from '../aas/hr-employee/repositories';
import { APP_GUARD } from '@nestjs/core';
import { AcessTokenGuard } from './guards';
import { AccessStrategy, RefreshStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature(
      [HrEmployee, HrDepartment],
      DatabaseEnum.AAS_DATABASE,
    ),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    TokenService,
    HrEmployeeService,
    HrEmployeeRepository,
    AccessStrategy,
    RefreshStrategy,
    HashService,
    {
      provide: APP_GUARD,
      useClass: AcessTokenGuard,
    },
  ],
})
export class AuthenticationModule {}
