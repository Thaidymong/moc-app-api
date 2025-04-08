import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import { HrEmployeeService } from '~/modules/aas/hr-employee/hr-employee.service';
import { HrEmployee } from '~/modules/aas/hr-employee/entities';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly hrEmployeeService: HrEmployeeService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<HrEmployee> {
    return (await this.hrEmployeeService.findOneById(payload.sub)).data;
  }
}
