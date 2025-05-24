import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { IsNotEmpty } from 'class-validator';

class CreateArticleDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  content: string;
}

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createArticle(
    @Body() dto: CreateArticleDto,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newUuid: string = uuidv4();
    if (file == null) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Please include the article image' });
    }

    const newFile = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });

    let pictureUrl: string | null = await this.supabaseService.create(
      `article-picture/${newUuid}/${file.originalname}`,
      newFile,
    );
    if (pictureUrl == null) {
      pictureUrl = '';
    }

    const article = await this.articleService.createArticle({
      title: dto.title,
      author: dto.author,
      content: dto.content,
      picture_url: pictureUrl,
    });

    return res.status(HttpStatus.CREATED).send(article);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getArticles(@Res() res: Response) {
    const articles = await this.articleService.articles();
    return res.status(HttpStatus.OK).send(articles);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getArticle(@Res() res: Response, @Param('id') id: string) {
    const article = await this.articleService.article({ id });
    if (!article) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Article not found',
        success: false,
      });
    }
    return res.status(HttpStatus.OK).send(article);
  }
}
