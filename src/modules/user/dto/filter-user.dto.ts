import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { DecryptedTransform } from '../../../transformers/decrypted-transform';

export class FilterUserDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'José Maria' })
  @IsOptional()
  @Transform(DecryptedTransform)
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(DecryptedTransform)
  email?: string;

  createWhere<T>(queryBuilder: SelectQueryBuilder<T>) {
    this.withFilter(this.fullName, () =>
      queryBuilder.andWhere('u.fullName like :fullName', {
        name: this.createLike(this.fullName),
      }),
    );

    this.withFilter(this.email, () =>
      queryBuilder.andWhere('u.email like :email', {
        email: this.createLike(this.email),
      }),
    );

    this.withFilter(this.startAt, () =>
      queryBuilder.andWhere('date(u.createdAt) >= :startAt', {
        startAt: this.startAt,
      }),
    );

    this.withFilter(this.endAt, () =>
      queryBuilder.andWhere('date(u.createdAt) <= :endAt', {
        endAt: this.endAt,
      }),
    );
  }

  createOrder<T>(queryBuilder: SelectQueryBuilder<T>) {
    if (this.order) {
      Object.entries(this.order).forEach(([field, value]) => {
        this.withOrderBy(field, 'fullName', () =>
          queryBuilder.addOrderBy('u.fullName', value),
        );
      });
    }
  }
}
