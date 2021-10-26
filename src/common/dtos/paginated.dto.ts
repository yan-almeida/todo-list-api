import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaDto {
  @ApiPropertyOptional()
  totalItems?: number;

  @ApiPropertyOptional()
  itemCount?: number;

  @ApiPropertyOptional()
  itemsPerPage?: number;

  @ApiPropertyOptional()
  totalPages?: number;

  @ApiPropertyOptional()
  currentPage?: number;
}

export class PaginatedDto<T> {
  items: T[];

  @ApiProperty({
    type: MetaDto,
  })
  meta: MetaDto;
}
