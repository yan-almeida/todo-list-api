import { ApiProperty } from '@nestjs/swagger';

export class EnumerationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;
}
