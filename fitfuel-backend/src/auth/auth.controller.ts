import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Response } from 'express';
import { Public } from '../utils/decorator';

class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

class SignUpDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(
      signUpDto.first_name,
      signUpDto.last_name,
      signUpDto.phone_number,
      signUpDto.email,
      signUpDto.password,
      res,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return res
      .status(200)
      .send({ message: 'Logout successful', success: true });
  }
}
