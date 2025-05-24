import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async article(
    articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
  ): Promise<Article | null> {
    return this.prisma.article.findFirst({ where: articleWhereUniqueInput });
  }

  async articles(): Promise<Article[]> {
    return this.prisma.article.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({ data });
  }
}
