import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type{ AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    const { id, email, firstName, lastName, picture, createdAt } = req.user;
    return { id, email, firstName, lastName, picture, createdAt };
  }
}