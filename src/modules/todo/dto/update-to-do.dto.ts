import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-to-do.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
