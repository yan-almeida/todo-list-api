import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadBuilder } from '../../common/builders/jwt-payload.builder';
import { ITokenUser } from '../../common/interfaces/token-user.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ITokenUser> {
    const user = await this._userService.findOneByEmail(email);

    await this._userService.validateUserPassword(password, user.password);

    const token = this.#generateToken(user);

    return {
      user,
      token,
    };
  }
  #generateToken(user: User) {
    const payload = JwtPayloadBuilder.toPayload(
      user.id,
      user.fullName,
      user.role,
    );

    return this._jwtService.sign(payload);
  }
}
