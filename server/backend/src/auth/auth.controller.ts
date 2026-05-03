import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UsersService } from '../users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body)
  }

  @Post('login')
login(@Body() body: any) {
  return this.authService.login(body)
}

@Get()
@UseGuards(JwtAuthGuard)
findAll() {
  return this.usersService.findAll()
}

@Get('me')
@UseGuards(JwtAuthGuard)
getMe(@Req() req: any) {
  return req.user
}
}