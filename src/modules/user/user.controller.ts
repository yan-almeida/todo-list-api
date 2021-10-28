import {
  Body,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginatedDto } from '../../common/dtos/paginated.dto';
import { PaginationParser } from '../../common/parsers/pagination.parser';
import { JwtGuardSetup } from '../../decorators/jwt-guard.decorator';
import { ApiController } from '../../decorators/swagger/api-controller.decorator';
import { PaginatedOkResponse } from '../../decorators/swagger/api-paginated-response.decorator';
import { BadRequestResponse } from '../../decorators/swagger/bad-request-response.decorator';
import { CreatedResponse } from '../../decorators/swagger/created-response.decorator';
import { NoContentResponse } from '../../decorators/swagger/no-content-response.decorator';
import { NotFoundResponse } from '../../decorators/swagger/not-found-response.decorator';
import { OkResponse } from '../../decorators/swagger/ok-response.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto as FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserParser } from './parsers/user.parser';
import { UserService } from './user.service';

@ApiController('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @CreatedResponse({
    description: 'Criação de Usuário',
    type: UserDto,
  })
  @BadRequestResponse()
  async create(@Body() dto: CreateUserDto) {
    const result = await this._userService.create(dto);

    return UserParser.toUserDto(result);
  }

  @Get()
  @PaginatedOkResponse(UserDto, { description: 'Paginação de Usuários' })
  @BadRequestResponse()
  async paginate(
    @Query() filter: FilterUserDto,
  ): Promise<PaginatedDto<UserDto>> {
    const paginate = await this._userService.paginate(filter);

    return PaginationParser.toPagination(paginate, UserParser.toUserDto);
  }

  @Get(':id')
  @OkResponse({
    type: UserDto,
    description: 'Detalhes de Usuário',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this._userService.findOne(id);

    return UserParser.toUserDto(result);
  }

  @Patch(':id')
  @OkResponse({
    type: UserDto,
    description: 'Atualização de dados do Usuário',
  })
  @NoContentResponse()
  @NotFoundResponse()
  @BadRequestResponse()
  @JwtGuardSetup()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const result = await this._userService.update(id, dto);

    return UserParser.toUserDto(result);
  }

  @Delete(':id')
  @NoContentResponse({ description: 'Deleção de Usuário' })
  @NotFoundResponse()
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this._userService.remove(id);
  }
}
