import {Controller, Get, HttpCode, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Get("me")
    async getUser(@Req() req:Request) {
        return {
            message:"Authorized",
            user:req["user"],
            success:true
        }
    }
}
