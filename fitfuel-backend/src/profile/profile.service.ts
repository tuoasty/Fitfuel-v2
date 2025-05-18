import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ActivityLevel, DietPreference, Prisma, Profile} from "@prisma/client";
import {User, UsersService} from "../users/users.service";

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService, private usersService: UsersService) {
    }

    async profile(profileWhereUniqueInput: Prisma.ProfileWhereUniqueInput): Promise<Profile|null> {
        return this.prisma.profile.findFirst({where: profileWhereUniqueInput});
    }

    async createProfile(userId:string, weight:number, height:number, dateOfBirth:Date, activityLevel:ActivityLevel, dietPreference:DietPreference):Promise<Profile> {
        return this.prisma.profile.create({
            data: {
                userId,
                weight,
                height,
                dateOfBirth,
                activityLevel,
                dietPreference,
            }
        })
    }
}
