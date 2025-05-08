/*
  Warnings:

  - You are about to drop the column `expiresat` on the `Session` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiresat",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WeightEntries" ALTER COLUMN "createdat" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "DietEntries" (
    "id" SERIAL NOT NULL,
    "ownerid" INTEGER NOT NULL,
    "diet" TEXT NOT NULL,

    CONSTRAINT "DietEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DietEntries" ADD CONSTRAINT "DietEntries_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
