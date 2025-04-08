import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({
    type: 'string',
    default: 'sok.dara@moc.gov.kh',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    type: 'string',
    default: 'Moc@168',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
