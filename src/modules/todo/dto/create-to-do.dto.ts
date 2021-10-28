import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { subWeeks } from 'date-fns';

const SUB_WEEK = 1;
export class CreateTodoDto {
  @ApiProperty({ example: 'Eu preciso fazer...' })
  @MaxLength(255, {
    message: 'Tamanho máximo de descrição. Deve ser menor que 255 caracteres',
  })
  description: string;

  @ApiPropertyOptional({ example: subWeeks(new Date(), SUB_WEEK) })
  @IsOptional()
  @IsDateString({}, { message: 'Formato de data inválido' })
  startsAt?: Date;

  @ApiPropertyOptional({ example: new Date() })
  @IsOptional()
  @IsDateString({}, { message: 'Formato de data inválido' })
  endsAt?: Date;

  @ApiProperty({ example: false })
  @IsBoolean({ message: 'Formato booleano inválido. ' })
  done: boolean;
}
