import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
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

    await this.#validateUserPassword(password, user.password);

    const token = this.#generateToken(user);

    return {
      user,
      token,
    };
  }
  async #validateUserPassword(plainPass: string, hashedPass: string) {
    const usuario = await compare(plainPass, hashedPass);

    if (!usuario) {
      throw new UnauthorizedException();
    }
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
