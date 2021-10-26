import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class AuthedDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
