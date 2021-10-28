import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { LowerCaseTransform } from '../../../transformers/lower-case.transform';

export class LoginAuthDto {
  @IsEmail({}, { message: 'E-mail digitado é inválido' })
  @MinLength(2, { message: 'O nome deve possuir no mínimo 2 caracteres.' })
  @ApiProperty()
  @Transform(LowerCaseTransform)
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(2, { message: 'A senha deve possuir no mínimo 2 caracteres.' })
  @ApiProperty()
  password: string;
}
