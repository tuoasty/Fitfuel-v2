import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Param,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from '../supabase/supabase.service';
import { Response } from 'express';
import { Transform } from 'class-transformer';
import { RecipeCategory } from '@prisma/client';

class CreateRecipeDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  time: string;
  @IsDecimal()
  calories: string;
  @IsDecimal()
  protein: string;
  @IsDecimal()
  carbs: string;
  @IsDecimal()
  fat: string;
  @IsDecimal()
  fiber: string;
  @IsArray()
  @ArrayMinSize(1)
  ingredients: string[];
  @IsArray()
  @ArrayMinSize(1)
  directions: string[];
}

class GetRecipeDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    return value.toUpperCase();
  })
  @IsEnum(RecipeCategory)
  category?: RecipeCategory;

  @IsOptional()
  @IsString()
  search?: string;
}

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createRecipe(
    @Body() dto: CreateRecipeDto,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newUuid: string = uuidv4();
    if (file == null) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Please include the recipe image' });
    }
    const newFile = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    let pictureUrl: string | null = await this.supabaseService.create(
      `recipe-picture/${newUuid}/${file.originalname}`,
      newFile,
    );
    if (pictureUrl == null) {
      pictureUrl = '';
    }
    const recipe = await this.recipeService.create({
      id: newUuid,
      calories: parseInt(dto.calories),
      carbs: parseInt(dto.carbs),
      description: dto.description,
      directions: dto.directions,
      fat: parseInt(dto.fat),
      fiber: parseInt(dto.fiber),
      ingredients: dto.ingredients,
      name: dto.name,
      picture_url: pictureUrl,
      protein: parseInt(dto.protein),
      time: dto.time,
    });
    return res.status(HttpStatus.CREATED).send(recipe);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getRecipes(
    @Res() res: Response,
    @Query(
      new ValidationPipe({
        skipMissingProperties: true,
        skipUndefinedProperties: true,
        transform: true,
      }),
    )
    data: GetRecipeDto,
  ) {
    console.log(data);
    const filters: any = {};
    if (data.category && data.category != RecipeCategory.ALL)
      filters.category = data.category;
    if (data.search)
      filters.name = { contains: data.search, mode: 'insensitive' };
    const recipes = await this.recipeService.recipes({ where: filters });
    res.status(HttpStatus.OK).send(recipes);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getRecipe(@Res() res: Response, @Param('id') id: string) {
    const recipe = await this.recipeService.recipe({ id: id });
    res.status(HttpStatus.OK).send(recipe);
  }
}
