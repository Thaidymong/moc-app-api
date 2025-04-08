import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../interfaces/token.interface';

export class LoginResponseDto {
  @ApiProperty({
    title: 'Message',
    type: 'string',
    default: 'Success',
  })
  readonly message: string;

  @ApiProperty({
    title: 'data',
    type: 'object',
    properties: {
      access_token: {
        name: 'access_token',
        type: 'string',
      },
      refresh_token: {
        name: 'refresh_token',
        type: 'string',
      },
    },
  })
  readonly data: Token;

  constructor(message: string, data: Token) {
    this.message = message;
    this.data = data;
  }
}
