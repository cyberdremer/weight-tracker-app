/*
  Warnings:

  - You are about to drop the column `dietname` on the `DietEntries` table. All the data in the column will be lost.
  - Added the required column `name` to the `DietEntries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietEntries" DROP COLUMN "dietname",
ADD COLUMN     "name" TEXT NOT NULL;
