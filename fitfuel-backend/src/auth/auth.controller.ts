import {Body, Controller, HttpCode, HttpStatus, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {IsEmail, IsNotEmpty} from "class-validator";
import {Response} from "express";
import {Public} from "../utils/decorator";

class SignInDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("login")
    signIn(@Body() signInDto:SignInDto,
           @Res() res:Response){
        return this.authService.signIn(signInDto.email, signInDto.password, res);
    }
}
