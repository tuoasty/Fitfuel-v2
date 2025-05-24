import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prismaService: PrismaService) {}

  async recipes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RecipeWhereUniqueInput;
    where?: Prisma.RecipeWhereInput;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
  }): Promise<Recipe[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.recipe.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.RecipeCreateInput): Promise<Recipe | undefined> {
    return this.prismaService.recipe.create({ data });
  }

  async recipe(recipeWhereUniqueInput: Prisma.RecipeWhereUniqueInput) {
    return this.prismaService.recipe.findFirst({
      where: recipeWhereUniqueInput,
    });
  }

  async count(){
    return this.prismaService.recipe.count();
  }
}
