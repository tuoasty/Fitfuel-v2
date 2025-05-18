/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import { Prisma } from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User|undefined> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async createUser(data:Prisma.UserCreateInput):Promise<User> {
        return this.prisma.user.create({
            data
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {data, where} = params;
        console.log(where);
        return this.prisma.user.update({
            data,
            where,
        })
    }
}
