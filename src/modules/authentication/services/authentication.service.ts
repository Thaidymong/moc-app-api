import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoginInputDto, LoginResponseDto, RefreshTokenInputDto } from '../dto';
import { HrEmployeeService } from '~/modules/aas/hr-employee/hr-employee.service';
import { HashService } from '~/shared/hash/hash.service';
import { HrEmployee } from '~/modules/aas/hr-employee/entities';
import { HrEmployeeResponseDto } from '~/modules/aas/hr-employee/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly hrEmployeeService: HrEmployeeService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(input: LoginInputDto): Promise<LoginResponseDto> {
    const user = await this.hrEmployeeService.findOneByEmail(input.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await this.hashService.compareBcryptHash(
      input.password,
      user.data.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const tokens = await this.tokenService.generateTokenPair({
      userId: user.data.id,
    });

    return new LoginResponseDto('Login successfully', {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });
  }

  async getMe(user: HrEmployee): Promise<HrEmployeeResponseDto> {
    return new HrEmployeeResponseDto(
      'Get current hr employee successfully',
      user,
    );
  }

  async forgetPassword(input: LoginInputDto): Promise<LoginResponseDto> {
    const user = await this.hrEmployeeService.findOneByEmail(input.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const tokens = await this.tokenService.generateTokenPair({
      userId: user.data.id,
    });

    return new LoginResponseDto('Forget password successfully', {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });
  }

  async refreshToken(input: RefreshTokenInputDto): Promise<LoginResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(input.refreshToken, {
        secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      });

      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.tokenService.generateTokenPair({
        userId: payload.sub,
      });

      return new LoginResponseDto('Refresh token successfully', {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
