import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ActivityLevel, DietPreference, User} from "@prisma/client";
import {Response} from "express";
import {IsDate, IsDecimal, IsEnum, IsIn, IsNotEmpty, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";

class CompleteProfileDto {
    @IsNumber()
    weight: number;
    @IsNumber()
    height: number;
    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date;
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(ActivityLevel)
    activityLevel: ActivityLevel;
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(DietPreference)
    dietPreference: DietPreference;
}

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get("me")
    async getProfile(@Req() req: Request, @Res() res: Response) {
        let user: User = req["user"]
        let profile = await this.profileService.profile({userId: user.id})
        if (!profile) {
            return res.status(HttpStatus.NOT_FOUND).send({message: "Please fill out your information first!"})
        } else {
            return res.status(HttpStatus.OK).send({profile});
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post("complete-profile")
    async completeProfile(@Body() dto:CompleteProfileDto, @Res() res:Response, @Req() req:Request) {
        let user: User = req["user"]
        const profile = this.profileService.createProfile(
            user.id,
            dto.weight,
            dto.height,
            dto.dateOfBirth,
            dto.activityLevel,
            dto.dietPreference
        )
        return res.json(profile);
    }
}
