-- CreateEnum
CREATE TYPE "RecipeCategory" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'MEAL');

-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "category" "RecipeCategory" NOT NULL DEFAULT 'MEAL';
