import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
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
