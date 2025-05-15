import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {IsEmail, IsNotEmpty} from "class-validator";

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
    @Post("login")
    signIn(@Body() signInDto:SignInDto){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
