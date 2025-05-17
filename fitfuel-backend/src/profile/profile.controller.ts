import {Controller, Get, HttpCode, HttpStatus, Req, Res} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {User} from "@prisma/client";
import {Response} from "express";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get("me")
    async getProfile(@Req() req:Request, @Res() res:Response) {
        let user:User = req["user"]
        let profile =await this.profileService.profile({userId:user.id})
        if(!profile){
            return res.status(HttpStatus.NOT_FOUND).send({message:"Please fill out your information first!"})
        } else {
            return res.status(HttpStatus.OK).send({message:"Success"});
        }
    }
}
