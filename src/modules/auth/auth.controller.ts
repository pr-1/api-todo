import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/user.decorator';

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
    return this.authService.loginUser(authDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user) {
    console.log(user);
    return {'message': 'success'};
  }
}
