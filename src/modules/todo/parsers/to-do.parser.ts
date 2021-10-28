import { ToDoDto } from '../dto/to-do.dto';
import { ToDo } from '../entities/to-do.entity';

export class ToDoParser {
  static toToDoDto(entity: ToDo): ToDoDto {
    return {
      id: entity.id,
      description: entity.description,
      done: entity.done,
      createdAt: entity.createdAt,
      startsAt: entity?.startsAt,
      endsAt: entity?.endsAt,
    };
  }
}
