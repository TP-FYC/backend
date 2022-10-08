import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ContentType } from '../../../../infrastructure/database/model/enums/content-type';

export class CreateContentRequest {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  @IsNotEmpty()
  public readonly content: string;
  @ApiProperty()
  @IsEnum(ContentType)
  public readonly contentType: ContentType;
  @ApiProperty()
  public readonly parentId: string;
  @ApiProperty()
  @IsNotEmpty()
  public readonly creatorId: string;
  @ApiProperty()
  public readonly stdin: string;
  @ApiProperty()
  public readonly stdout: string;
}
