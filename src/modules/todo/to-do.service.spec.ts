import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestMock } from '../../common/mocks/test.mock';
import { UserService } from '../user/user.service';
import { ToDo } from './entities/to-do.entity';
import { ToDoMock } from './mocks/to-do.mock';
import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let toDoService: ToDoService;

  const mockedRepo = TestMock.mockedRepo();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToDoService,
        UserService,
        {
          provide: getRepositoryToken(ToDo),
          useValue: mockedRepo,
        },
        {
          provide: UserService,
          useValue: mockedRepo, // replace
        },
      ],
    }).compile();

    toDoService = module.get(ToDoService);
  });

  beforeEach(() => {
    mockedRepo.save.mockReset(),
      mockedRepo.create.mockReset(),
      mockedRepo.find.mockReset(),
      mockedRepo.findOne.mockReset(),
      mockedRepo.update.mockReset(),
      mockedRepo.delete.mockReset();
    mockedRepo.createQueryBuilder.mockReset();
  });

  it('should be defined', () => {
    expect(toDoService).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um afazer', async () => {
      const toDo = ToDoMock.validToDo();
    });
  });
});
