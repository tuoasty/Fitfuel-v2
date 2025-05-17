-- CreateEnum
CREATE TYPE "DietPreference" AS ENUM ('GENERAL', 'VEGAN', 'VEGETARIAN');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'VERY', 'EXTRA');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "dietPreference" "DietPreference" NOT NULL DEFAULT 'GENERAL',
    "activityLevel" "ActivityLevel" NOT NULL DEFAULT 'MODERATE',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
