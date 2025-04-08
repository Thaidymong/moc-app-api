import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AbstractSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  q: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsInt()
  take = 10;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
