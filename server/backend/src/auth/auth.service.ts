import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    return this.usersService.create(data)
  }

  async login(data: any) {
    const user = await this.usersService.findByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password')
    }

    // create token payload
    const payload = { sub: user.id, email: user.email }

    const token = this.jwtService.sign(payload)

    // remove password before returning
    const { password, ...safeUser } = user

    return {
      message: 'Login successful',
      access_token: token,
      user: safeUser,
    }
  }
}