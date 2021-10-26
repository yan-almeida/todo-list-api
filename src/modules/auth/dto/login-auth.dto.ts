import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'E-mail digitado é inválido' })
  @MinLength(2, { message: 'O nome deve possuir no mínimo 2 caracteres.' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(2, { message: 'A senha deve possuir no mínimo 2 caracteres.' })
  @ApiProperty()
  password: string;
}
