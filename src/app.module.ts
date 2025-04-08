import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AASTypeOrmModule } from './database/aas/aas-typeorm.module';
import { AttendanceTypeOrmModule } from './database/attendance/attendance-typeorm.module';
import { HrEmployeeModule } from './modules/aas/hr-employee/hr-employee.module';
import { HrDepartmentModule } from './modules/aas/hr-department/hr-department.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddleware } from './common/middlewares';
import { LoggerModule } from './common/logger/logger.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './modules/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AcessTokenGuard } from './modules/authentication/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    HealthModule,
    TerminusModule,
    LoggerModule,
    SwaggerModule,
    AASTypeOrmModule,
    AttendanceTypeOrmModule,
    HrEmployeeModule,
    HrDepartmentModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
