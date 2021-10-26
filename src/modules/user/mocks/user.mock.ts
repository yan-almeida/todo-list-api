import { AppRoles } from '../../../app.roles';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Faker = require('faker-br');

export class UserMock {
  static validUser(): CreateUserDto {
    return {
      fullName: Faker.name.findName(),
      email: Faker.internet.email(),
      phoneNumber: Faker.phone.phoneNumber(),
      address: `${Faker.address.streetAddress()} - ${Faker.address.state()}`,
      role: AppRoles.USER,
      password: Faker.internet.password(),
    };
  }

  static updateUserWithoutPassword(): UpdateUserDto {
    return {
      fullName: Faker.name.findName(),
      email: Faker.internet.email(),
      phoneNumber: Faker.phone.phoneNumber(),
      address: `${Faker.address.streetAddress()} - ${Faker.address.state()}`,
    };
  }
}
