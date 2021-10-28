import { CreateTodoDto } from '../dto/create-to-do.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Faker = require('faker-br');
export class ToDoMock {
  static validToDo(): CreateTodoDto {
    return {
      description: `Preciso fazer atividade do professore ${Faker.name.findName()}`,
      done: false,
    };
  }
}
