import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

    return {
      message: 'Login successful',
      user,
    }
  }
}