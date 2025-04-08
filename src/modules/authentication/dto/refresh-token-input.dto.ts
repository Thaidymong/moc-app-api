import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  refreshToken: string;
}
