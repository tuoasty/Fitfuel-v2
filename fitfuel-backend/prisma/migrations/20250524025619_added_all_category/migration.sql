/*
  Warnings:

  - The values [MEAL] on the enum `RecipeCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecipeCategory_new" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'ALL');
ALTER TABLE "recipe" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "recipe" ALTER COLUMN "category" TYPE "RecipeCategory_new" USING ("category"::text::"RecipeCategory_new");
ALTER TYPE "RecipeCategory" RENAME TO "RecipeCategory_old";
ALTER TYPE "RecipeCategory_new" RENAME TO "RecipeCategory";
DROP TYPE "RecipeCategory_old";
ALTER TABLE "recipe" ALTER COLUMN "category" SET DEFAULT 'ALL';
COMMIT;

-- AlterTable
ALTER TABLE "recipe" ALTER COLUMN "category" SET DEFAULT 'ALL';
