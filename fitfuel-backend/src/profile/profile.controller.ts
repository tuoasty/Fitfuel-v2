import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ActivityLevel, DietPreference, User} from "@prisma/client";
import {Response} from "express";
import {IsDate, IsDecimal, IsEnum, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";
import {FileInterceptor} from "@nestjs/platform-express";
import {SupabaseService} from "../supabase/supabase.service";

class CompleteProfileDto {
    @IsDecimal()
    weight: string;
    @IsDecimal()
    height: string;
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
    constructor(private profileService: ProfileService, private supabaseService:SupabaseService) {
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
    @UseInterceptors(FileInterceptor('file'))
    @Post("complete")
    async completeProfile(@Body() dto:CompleteProfileDto, @Res() res:Response, @Req() req:Request, @UploadedFile() file: Express.Multer.File) {
        console.log(dto.weight);
        console.log(dto.activityLevel);
        console.log(dto.dietPreference);
        let user: User = req["user"]
        let newFile = new File([file.buffer], file.originalname, {type:file.mimetype})
        let pictureUrl:string|null = await this.supabaseService.create("profile-picture", `${user.id}/${file.originalname}`, newFile)
        if (pictureUrl == null) {
            pictureUrl = "";
        }
        const profile = this.profileService.createProfile(
            user.id,
            parseFloat(dto.weight),
            parseFloat(dto.height),
            dto.dateOfBirth,
            dto.activityLevel,
            dto.dietPreference,
            pictureUrl
        )
        return res.json(profile);
    }
}
