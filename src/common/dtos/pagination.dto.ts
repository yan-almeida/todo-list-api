import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsOptional } from 'class-validator';
import { format, subWeeks } from 'date-fns';
import { SelectQueryBuilder } from 'typeorm';
import { ParseNumberTransform } from '../../transformers/parse-number.transform';
import {
  BuilderFunction,
  EntityFilterBuilder,
} from '../builders/entity-filter.builder';

const SUB_WEEK = 1;
export abstract class PaginationDto {
  @ApiPropertyOptional({
    description: 'Pagina atual',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Transform(ParseNumberTransform)
  page?: number;

  @ApiPropertyOptional({
    description: 'Limite de entidades por página',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Transform(ParseNumberTransform)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Ordenação',
  })
  @IsOptional()
  @Allow()
  order?: {
    [prop: string]: 'ASC' | 'DESC';
  };

  @ApiPropertyOptional({
    description: 'Entidades a partir de uma data',
    example: format(subWeeks(new Date(), SUB_WEEK), 'dd/mm/yyyy'),
  })
  @IsOptional()
  startAt?: string;

  @ApiPropertyOptional({
    description: 'Entidades até de uma data',
    example: format(new Date(), 'dd/mm/yyyy'),
  })
  @IsOptional()
  endAt?: string;

  protected getWithArray(value: any) {
    return EntityFilterBuilder.getAsArray(value);
  }

  protected withFilter<E = any>(field: E, fnc: BuilderFunction<E>) {
    EntityFilterBuilder.withFilter(field, fnc);
  }

  protected withOrderBy<E = any>(field: E, value: E, fnc: BuilderFunction<E>) {
    EntityFilterBuilder.withOrderBy(field, value, fnc);
  }

  protected createLike(value: string) {
    return EntityFilterBuilder.createLike(value);
  }

  abstract createWhere<T = any>(queryBuilder: SelectQueryBuilder<T>): void;

  createOrder<T = any>(queryBuilder: SelectQueryBuilder<T>): void {
    if (this.order) {
      Object.entries(this.order).forEach(([field, value]) => {
        queryBuilder.addOrderBy(`${queryBuilder.alias}.${field}`, value);
      });
    }
  }
}
