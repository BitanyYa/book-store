import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Post('login')
  login(@Body() body: LoginDto) {
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