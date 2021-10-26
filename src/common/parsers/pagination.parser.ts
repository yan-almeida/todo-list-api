import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { PaginatedDto } from '../dtos/paginated.dto';

export class PaginationParser {
  static toPagination<P, M>(
    paginate: Pagination<P, IPaginationMeta>,
    mapperFn: (entity: P) => M,
  ): PaginatedDto<M> {
    return {
      items: paginate.items.map(mapperFn),
      meta: paginate.meta,
    };
  }
}
