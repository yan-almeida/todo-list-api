import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TestMock } from '../../common/mocks/test.mock';
import { User } from './entities/user.entity';
import { UserMock } from './mocks/user.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const mockedRepo = TestMock.mockedRepo();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    userService = module.get(UserService);
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
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um usuário', async () => {
      const user = UserMock.validUser();

      mockedRepo.create.mockReturnValue(user);
      mockedRepo.save.mockReturnValue(user);

      const createdUser = await userService.create(user);

      expect(createdUser).toMatchObject(user);
      expect(mockedRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedRepo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário existente pelo id', async () => {
      const user = UserMock.validUser();
      mockedRepo.findOne.mockReturnValue(user);

      const searchedUser = await userService.findOne(uuid());

      expect(searchedUser).toMatchObject(user);
      expect(mockedRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um usuário existente pelo email', async () => {
      const user = UserMock.validUser();
      mockedRepo.findOne.mockReturnValue(user);

      const searchedUser = await userService.findOneByEmail(user.email);

      expect(searchedUser).toMatchObject(user);
      expect(mockedRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma exceção ao não encontrar um usuário pelo id', async () => {
      mockedRepo.findOne.mockReturnValue(null);

      expect(userService.findOne(uuid())).rejects.toBeInstanceOf(HttpException);
      expect(mockedRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma exceção ao não encontrar um usuário pelo email', async () => {
      mockedRepo.findOne.mockReturnValue(null);

      expect(
        userService.findOneByEmail('email@email.com'),
      ).rejects.toBeInstanceOf(HttpException);
      expect(mockedRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve retornar um usuário atualizado', async () => {
      const user = UserMock.validUser();

      mockedRepo.update.mockReturnValue(user);
      mockedRepo.findOne.mockReturnValue(user);

      const updatedUser = await userService.update(uuid(), user);

      expect(updatedUser).toMatchObject(user);
      expect(mockedRepo.update).toHaveBeenCalledTimes(1);
      expect(mockedRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma exceção ao não encontrar um usuário para atualizar', async () => {
      mockedRepo.update.mockReturnValue(TestMock.nonAffectedRows());

      expect(userService.update(uuid(), null)).rejects.toBeInstanceOf(
        HttpException,
      );
      expect(mockedRepo.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('deve deletar um usuário', async () => {
      mockedRepo.delete.mockReturnValue(null);
    });

    it('deve retornar uma exceção ao não encontrar um usuário para deletar', async () => {
      mockedRepo.delete.mockReturnValue(TestMock.nonAffectedRows());

      expect(userService.remove(uuid())).rejects.toBeInstanceOf(HttpException);
      expect(mockedRepo.delete).toHaveBeenCalledTimes(1);
    });
  });
});
