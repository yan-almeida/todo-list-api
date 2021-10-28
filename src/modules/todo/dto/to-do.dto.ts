import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { subWeeks } from 'date-fns';
import { ApiPropertyUuid } from '../../../decorators/swagger/api-proproperty-uuid.decorator';

const SUB_WEEK = 1;
export class ToDoDto {
  @ApiPropertyUuid()
  id: string;

  @ApiProperty({ example: 'Eu preciso fazer...' })
  description: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiPropertyOptional({ example: subWeeks(new Date(), SUB_WEEK) })
  startsAt?: Date;

  @ApiPropertyOptional({ example: new Date() })
  endsAt?: Date;

  @ApiProperty({ example: false })
  done: boolean;
}
