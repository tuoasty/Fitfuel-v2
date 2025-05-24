import { Injectable } from '@nestjs/common';
import { Prisma, Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async article(
    articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    return this.prismaService.article.findFirst({ where: articleWhereUniqueInput });
  }

  async articles(): Promise<Article[]> {
    return this.prismaService.article.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prismaService.article.create({ data });
  }
}
