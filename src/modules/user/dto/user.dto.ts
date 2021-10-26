import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppRoles } from '../../../app.roles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Faker = require('faker-br');

export class UserDto {
  @ApiProperty({
    format: 'uuid',
    type: String,
  })
  id: string;

  @ApiProperty({ example: Faker.name.findName() })
  fullName: string;

  @ApiProperty({
    example: Faker.internet.email(),
  })
  email: string;

  @ApiProperty({
    example: AppRoles.USER,
  })
  role: string;

  @ApiPropertyOptional({ example: Faker.phone.phoneNumber() })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: `${Faker.address.streetAddress()} - ${Faker.address.state()}`,
  })
  address?: string;
}
