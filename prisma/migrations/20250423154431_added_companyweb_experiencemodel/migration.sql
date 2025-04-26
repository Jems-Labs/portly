/*
  Warnings:

  - The `toYear` column on the `WorkExperience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `fromYear` on the `WorkExperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "companyWebsite" TEXT,
DROP COLUMN "fromYear",
ADD COLUMN     "fromYear" INTEGER NOT NULL,
DROP COLUMN "toYear",
ADD COLUMN     "toYear" INTEGER;
