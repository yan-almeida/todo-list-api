import { User } from '../../user/entities/user.entity';
import { UserParser } from '../../user/parsers/user.parser';
import { AuthedDto } from '../dto/authed.dto';

export class AuthParser {
  static toAuthedDto(user: User, token: string): AuthedDto {
    return {
      user: UserParser.toUserDto(user),
      token,
    };
  }
}
