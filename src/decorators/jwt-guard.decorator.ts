import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UnauthorizedResponse } from './swagger/unauthorized-response.decorator';

const IS_JWT_AUTH_GUARD = 'jwtAuthGuard';
export function JwtGuardSetup() {
  return applyDecorators(
    SetMetadata(IS_JWT_AUTH_GUARD, null),
    ApiBearerAuth(),
    UnauthorizedResponse(),
    UseGuards(JwtAuthGuard),
  );
}
