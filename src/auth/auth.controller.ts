import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type{ GoogleAuthRequest } from './interfaces/google-auth-request.interface';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {
    // El guard redirige automáticamente a la pantalla de login de Google.
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: GoogleAuthRequest) {
    return {
      token: req.user.jwt,
      user: {
        id: req.user.user.id,
        email: req.user.user.email,
        firstName: req.user.user.firstName,
        lastName: req.user.user.lastName,
        picture: req.user.user.picture,
      },
    };
  }
}