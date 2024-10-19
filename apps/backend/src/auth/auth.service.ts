import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const salt = this.configService.get<string>('PASSWORD_SALT')
    const hash = crypto.pbkdf2Sync(pass, salt, 10000, 32, 'sha512').toString('hex');

    if (user?.password !== hash) {
      throw new UnauthorizedException();
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      completedSurveys: user.completedSurveys,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
