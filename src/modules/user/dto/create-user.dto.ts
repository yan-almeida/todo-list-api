import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { KeepAllNumbersTransform } from 'src/transformers/keep-all-numbers.transform';
import { AppRoles } from '../../../app.roles';
import { HashPasswordTransform } from '../../../transformers/hash-password.transform';
import { LowerCaseTransform } from '../../../transformers/lower-case.transform';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Faker = require('faker-br');

export class CreateUserDto {
  @ApiProperty({ example: Faker.name.findName() })
  @IsString({ message: 'Nome é inválido.' })
  @MaxLength(255, {
    message: 'Tamanho máximo do nome. Deve ser menor que 255 caracteres.',
  })
  @MinLength(2, {
    message: 'Tamanho mínimo do nome. Deve ser maior que 2 caracteres.',
  })
  fullName: string;

  @ApiProperty({
    example: Faker.internet.email(),
  })
  @MaxLength(255, {
    message: 'Tamanho máximo do email. Deve ser menor que 255 caracteres.',
  })
  @MinLength(2, {
    message: 'Tamanho mínimo do email. Deve ser maior que 2 caracteres.',
  })
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(LowerCaseTransform)
  email: string;

  @ApiPropertyOptional({ example: Faker.phone.phoneNumber() })
  @MaxLength(16, {
    message: 'Tamanho máximo do telefone. Deve ser menor que 16 caracteres.',
  })
  @IsOptional()
  @IsString({ message: 'Telefone é inválido.' })
  @MinLength(8, {
    message: 'Tamanho mínimo do telefone. Deve ser maior que 8 caracteres.',
  })
  @Transform(KeepAllNumbersTransform)
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: `${Faker.address.streetAddress()} - ${Faker.address.state()}`,
  })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: AppRoles.USER })
  @IsString({ message: 'A role é obrigatória.' })
  role: string;

  @ApiProperty({ example: Faker.internet.password() })
  @IsString({ message: 'A senha é obrigatória.' })
  @MinLength(5, { message: 'A senha. Deve possuir no mínimo 5 caracteres.' })
  @Transform(HashPasswordTransform)
  password: string;
}
