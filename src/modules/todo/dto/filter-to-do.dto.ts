import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterToDoDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'Eu preciso fazer...' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Afazer finalizado?' })
  @IsOptional()
  done?: boolean;

  createWhere<T>(queryBuilder: SelectQueryBuilder<T>) {
    this.withFilter(this.description, () =>
      queryBuilder.andWhere('td.description like :description', {
        description: this.createLike(this.description),
      }),
    );
    this.withFilter(this.done, () =>
      queryBuilder.andWhere('td.done = :done', {
        done: this.done,
      }),
    );
    this.withFilter(this.startAt, () =>
      queryBuilder.andWhere('date(td.createdAt) >= :startAt', {
        startAt: this.startAt,
      }),
    );
    this.withFilter(this.endAt, () =>
      queryBuilder.andWhere('date(td.createdAt) <= :endAt', {
        endAt: this.endAt,
      }),
    );
  }

  createOrder<T>(queryBuilder: SelectQueryBuilder<T>) {
    if (this.order) {
      Object.entries(this.order).forEach(([field, value]) => {
        this.withOrderBy(field, 'createdAt', () =>
          queryBuilder.addOrderBy('td.createdAt', value),
        );
      });
    }
  }
}
