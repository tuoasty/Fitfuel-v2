import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Recipe} from "@prisma/client";

@Injectable()
export class RecipeService {
    constructor(private prismaService:PrismaService){}

    async getAll():Promise<Recipe[]>{
        return this.prismaService.recipe.findMany();
    }

    async create(data:Prisma.RecipeCreateInput):Promise<Recipe|undefined>{
        return this.prismaService.recipe.create({data})
    }

    async getOne(recipeWhereUniqueInput:Prisma.RecipeWhereUniqueInput){
        return this.prismaService.recipe.findFirst({where: recipeWhereUniqueInput});
    }
}
