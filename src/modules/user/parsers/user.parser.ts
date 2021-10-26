import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserParser {
  static toUserDto(entity: User): UserDto {
    return {
      id: entity.id,
      fullName: entity.fullName,
      email: entity.email,
      address: entity.address,
      phoneNumber: entity.phoneNumber,
      role: entity.role,
    };
  }
}
