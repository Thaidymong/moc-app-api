import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { LoginInputDto, LoginResponseDto, RefreshTokenInputDto } from './dto';
import { CurrentUser, Public } from '~/common/decorators';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HrEmployee } from '../aas/hr-employee/entities';
import { HrEmployeeResponseDto } from '../aas/hr-employee/dto';

@Controller({
  version: '1',
  path: 'authentication',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login hr employee' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully',
    type: LoginResponseDto,
  })
  async login(
    @Body(new ValidationPipe({ transform: true }))
    input: LoginInputDto,
  ): Promise<LoginResponseDto> {
    return this.authenticationService.login(input);
  }

  @Get('me')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current hr employee profile' })
  @ApiResponse({
    status: 200,
    description: 'Return the hr employee profile.',
    type: HrEmployeeResponseDto,
  })
  async getMe(
    @CurrentUser(new ValidationPipe({ transform: true })) user: HrEmployee,
  ): Promise<HrEmployeeResponseDto> {
    return this.authenticationService.getMe(user);
  }

  @Post('refresh-token')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh token successfully',
    type: LoginResponseDto,
  })
  async refreshToken(
    @Body(new ValidationPipe({ transform: true }))
    input: RefreshTokenInputDto,
  ): Promise<LoginResponseDto> {
    return this.authenticationService.refreshToken(input);
  }
}
