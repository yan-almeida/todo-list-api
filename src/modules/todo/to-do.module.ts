import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ToDo } from './entities/to-do.entity';
import { TodoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo]), UserModule],
  controllers: [TodoController],
  providers: [ToDoService],
  exports: [ToDoService],
})
export class TodoModule {}
