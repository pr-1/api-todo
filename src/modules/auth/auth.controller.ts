import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Post('/register')
  signUp(@Body(ValidationPipe) authDto) {
    return this.authService.createUser(authDto);
  }
  @Post('/login')
  signIn(@Body() authDto) {
    return this.authService.createUser(authDto);
  }
}
