import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ExecuteProgramRequest {
  @ApiProperty()
  @IsNotEmpty()
  public readonly stdin: string;

  @ApiProperty()
  @IsNotEmpty()
  public readonly language: string;
}
