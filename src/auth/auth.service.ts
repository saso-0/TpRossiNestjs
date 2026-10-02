import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { GoogleUserData } from './interfaces/google-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(
    googleUser: GoogleUserData,
  ): Promise<{ user: User; jwt: string }> {
    try {
      let user = await this.usersService.findByGoogleId(googleUser.googleId);

      if (user) {
        user = await this.usersService.update(user, {
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          picture: googleUser.picture,
        });
      } else {
        const existingUser = await this.usersService.findByEmail(
          googleUser.email,
        );

        if (existingUser) {
          user = await this.usersService.update(existingUser, {
            googleId: googleUser.googleId,
            picture: googleUser.picture,
          });
        } else {
          user = await this.usersService.create(googleUser);
        }
      }

      const jwt = this.generateJwt(user);
      return { user, jwt };
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo validar el usuario de Google',
      );
    }
  }

  private generateJwt(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
