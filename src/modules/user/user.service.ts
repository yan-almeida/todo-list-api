import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from '../../exceptions/entity-not-found-error.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this._userRepo.create(dto);

    return this._userRepo.save(user);
  }
  paginate(filter: FilterUserDto) {
    const queryBuilder = this._userRepo.createQueryBuilder('u');

    filter.createOrder(queryBuilder);
    filter.createWhere(queryBuilder);

    return paginate(queryBuilder, {
      page: filter.page,
      limit: filter.limit,
    });
  }
  async findOne(id: string) {
    const user = await this._userRepo.findOne(id);

    if (!user) {
      throw new EntityNotFoundError(User, id);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this._userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const updateResult = await this._userRepo.update(id, dto);

    if (updateResult.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }

    return this._userRepo.findOne(id);
  }
  async remove(id: string) {
    const deleteResult = await this._userRepo.delete(id);

    if (deleteResult.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
