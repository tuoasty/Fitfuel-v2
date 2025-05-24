import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProfileModule } from './profile/profile.module';
import { SupabaseModule } from './supabase/supabase.module';
import { RecipeModule } from './recipe/recipe.module';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfileModule,
    SupabaseModule,
    RecipeModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
