/*
  Warnings:

  - You are about to drop the column `Description` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
