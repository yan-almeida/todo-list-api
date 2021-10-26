import { Body, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuardSetup } from '../../decorators/jwt-guard.decorator';
import { ApiController } from '../../decorators/swagger/api-controller.decorator';
import { BadRequestResponse } from '../../decorators/swagger/bad-request-response.decorator';
import { OkResponse } from '../../decorators/swagger/ok-response.decorator';
import { UnauthorizedResponse } from '../../decorators/swagger/unauthorized-response.decorator';
import { AuthService } from './auth.service';
import { AuthedDto } from './dto/authed.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthParser } from './parsers/auth.parser';

@ApiController('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  @OkResponse({
    description: 'Autenticação',
    type: AuthedDto,
  })
  @UnauthorizedResponse()
  @BadRequestResponse()
  async create(@Body() dto: LoginAuthDto): Promise<AuthedDto> {
    const result = await this._authService.validateUser(
      dto.email,
      dto.password,
    );

    return AuthParser.toAuthedDto(result.user, result.token);
  }

  @Get('profile')
  @OkResponse({
    description: 'Verificação de token',
  })
  @JwtGuardSetup()
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
