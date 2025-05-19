import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import {ProfileService} from "./profile.service";
import {PrismaModule} from "../prisma/prisma.module";
import {UsersModule} from "../users/users.module";
import {SupabaseModule} from "../supabase/supabase.module";

@Module({
  imports: [PrismaModule, SupabaseModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}