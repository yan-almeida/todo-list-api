import { ColumnOptions, Entity, ManyToOne } from 'typeorm';
import { UniqueIdentifierEntity } from '../../../common/entities/unique-identifier.entity';
import { NormalizedColumn } from '../../../decorators/normalized-column.decorator';
import { User } from '../../user/entities/user.entity';

const DEFAULT_CONFIG_COLUMN: ColumnOptions = {
  type: 'date',
  nullable: true,
};

@Entity()
export class ToDo extends UniqueIdentifierEntity {
  @NormalizedColumn({ length: 255 })
  description: string;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMN)
  startsAt?: Date;

  @NormalizedColumn(DEFAULT_CONFIG_COLUMN)
  endsAt?: Date;

  @NormalizedColumn({ default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.toDos)
  user: User;
}
