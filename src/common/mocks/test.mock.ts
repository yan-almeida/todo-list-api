import { PaginatedDto } from '../dtos/paginated.dto';

export class TestMock {
  static nonAffectedRows() {
    return {
      affected: 0,
    };
  }

  static createQueryBuilderSetup() {
    return jest.fn(() => ({
      delete: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: () => ({
        skip: (cnt: number) => ({
          skip: cnt,
        }),
      }),
    }));
  }
  static mockedRepo() {
    return {
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: this.createQueryBuilderSetup(),
    };
  }
  static resultPaginate<T>(items: T[]): PaginatedDto<T> {
    return {
      items,
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0,
      },
    };
  }
}
