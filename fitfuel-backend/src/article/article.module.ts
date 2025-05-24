import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticleController } from './article.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  providers: [ArticleService],
  exports: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
