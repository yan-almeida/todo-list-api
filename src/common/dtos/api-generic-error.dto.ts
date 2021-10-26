import { ApiProperty } from '@nestjs/swagger';

export class ApiGenericErroDto {
  @ApiProperty({
    example: 'Generic error',
  })
  error: string;

  @ApiProperty({
    example: 'Generic message error',
  })
  message: string;
}
