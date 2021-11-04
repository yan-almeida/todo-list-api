import {
  Body,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginatedDto } from '../../common/dtos/paginated.dto';
import { PaginationParser } from '../../common/parsers/pagination.parser';
import { ApiController } from '../../decorators/swagger/api-controller.decorator';
import { PaginatedOkResponse } from '../../decorators/swagger/api-paginated-response.decorator';
import { BadRequestResponse } from '../../decorators/swagger/bad-request-response.decorator';
import { CreatedResponse } from '../../decorators/swagger/created-response.decorator';
import { ForbiddenResponse } from '../../decorators/swagger/forbidden-response.decorator';
import { NoContentResponse } from '../../decorators/swagger/no-content-response.decorator';
import { NotFoundResponse } from '../../decorators/swagger/not-found-response.decorator';
import { OkResponse } from '../../decorators/swagger/ok-response.decorator';
import { UnauthorizedResponse } from '../../decorators/swagger/unauthorized-response.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-to-do.dto';
import { FilterToDoDto } from './dto/filter-to-do.dto';
import { ToDoDto } from './dto/to-do.dto';
import { UpdateTodoDto } from './dto/update-to-do.dto';
import { ToDoParser } from './parsers/to-do.parser';
import { ToDoService } from './to-do.service';

@ApiController('todo', 'to-do')
export class TodoController {
  constructor(private readonly _toDoService: ToDoService) {}

  @Post()
  @CreatedResponse({ description: 'Criação de afazer.', type: ToDoDto })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiBearerAuth()
  @UnauthorizedResponse()
  @ForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: CreateTodoDto,
    @Req() req: Request,
  ): Promise<ToDoDto> {
    const result = await this._toDoService.create(dto, req.user);

    return ToDoParser.toToDoDto(result);
  }

  @Get()
  @PaginatedOkResponse(ToDoDto, { description: 'Paginação de Afazeres' })
  @BadRequestResponse()
  @ApiBearerAuth()
  @UnauthorizedResponse()
  @ForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  async paginate(
    @Query() filter: FilterToDoDto,
    @Req() req: Request,
  ): Promise<PaginatedDto<ToDoDto>> {
    const paginate = await this._toDoService.paginate(filter, req.user);

    return PaginationParser.toPagination(paginate, ToDoParser.toToDoDto);
  }

  @Get(':id')
  @OkResponse({ description: 'Detalhes de Afazer', type: ToDoDto })
  @NotFoundResponse()
  @ApiBearerAuth()
  @UnauthorizedResponse()
  @ForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ToDoDto> {
    const result = await this._toDoService.findOne(id);

    return ToDoParser.toToDoDto(result);
  }

  @Patch(':id')
  @OkResponse({ description: 'Atualização de Afazer', type: ToDoDto })
  @NotFoundResponse()
  @BadRequestResponse()
  @ApiBearerAuth()
  @UnauthorizedResponse()
  @ForbiddenResponse()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTodoDto,
    @Req() req: Request,
  ) {
    const result = await this._toDoService.update(id, dto, req.user);

    return ToDoParser.toToDoDto(result);
  }

  @Delete(':id')
  @NoContentResponse({ description: 'Deleção de Afazer' })
  @ApiBearerAuth()
  @UnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @ForbiddenResponse()
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this._toDoService.remove(id, req.user);
  }
}
