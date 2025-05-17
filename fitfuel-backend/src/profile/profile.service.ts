import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Profile} from "@prisma/client";

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {
    }

    async profile(profileWhereUniqueInput: Prisma.ProfileWhereUniqueInput): Promise<Profile|null> {
        return this.prisma.profile.findFirst({where: profileWhereUniqueInput});
    }
}
