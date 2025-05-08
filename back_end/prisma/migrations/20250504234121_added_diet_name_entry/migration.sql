/*
  Warnings:

  - Added the required column `dietname` to the `DietEntries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietEntries" ADD COLUMN     "dietname" TEXT NOT NULL;
