import {Injectable} from '@nestjs/common';
import { Prisma } from "../../generated/prisma";
import {PrismaService} from "../prisma/prisma.service";

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    private readonly users = [
        {
            id: 1,
            email: "kevin@gmail.com",
            password:"kevin"
        },
    ];
    async findOne(email:string): Promise<User|undefined> {
        return this.users.find(user => user.email === email);
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User|undefined> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async createUser(data:Prisma.UserCreateInput):Promise<User> {
        return this.prisma.user.create(data);
    }
}
