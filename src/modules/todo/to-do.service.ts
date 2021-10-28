import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '../../exceptions/entity-not-found-error.exception';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-to-do.dto';
import { FilterToDoDto } from './dto/filter-to-do.dto';
import { UpdateTodoDto } from './dto/update-to-do.dto';
import { ToDo } from './entities/to-do.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo) private readonly _toDoRepo: Repository<ToDo>,
    private readonly _userService: UserService,
  ) {}

  async create(dto: CreateTodoDto, loggedUser: Express.User) {
    const user = await this._userService.findOne(loggedUser.userId);

    const toDo = this._toDoRepo.create({ ...dto, user });

    return this._toDoRepo.save(toDo);
  }

  paginate(filter: FilterToDoDto, loggedUser: Express.User) {
    const queryBuilder = this._toDoRepo
      .createQueryBuilder('td')
      .andWhere('td.user = :userId', { userId: loggedUser.userId });

    filter.createOrder(queryBuilder);
    filter.createWhere(queryBuilder);

    return paginate(queryBuilder, {
      page: filter.page,
      limit: filter.limit,
    });
  }

  async findOne(id: string) {
    const toDo = await this._toDoRepo.findOne(id, { relations: ['user'] });

    if (!toDo) {
      throw new EntityNotFoundError(id, ToDo);
    }

    return toDo;
  }

  async update(id: string, dto: UpdateTodoDto, loggedUser: Express.User) {
    await this.#validateToDoUser(id, loggedUser);

    const updateResult = await this._toDoRepo.update(id, dto);

    if (updateResult.affected === 0) {
      throw new EntityNotFoundError(ToDo, id);
    }

    return this._toDoRepo.findOne(id);
  }

  async remove(id: string, loggedUser: Express.User) {
    await this.#validateToDoUser(id, loggedUser);

    const deleteResult = await this._toDoRepo.delete(id);

    if (deleteResult.affected === 0) {
      throw new EntityNotFoundError(ToDo, id);
    }
  }

  async #validateToDoUser(id: string, loggedUser: Express.User) {
    const toDo = await this.findOne(id);

    if (toDo.user.id === loggedUser.userId) {
      throw new ForbiddenException();
    }
  }
}
