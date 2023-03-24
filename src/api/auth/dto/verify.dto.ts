import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
