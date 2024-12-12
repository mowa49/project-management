/*
  Warnings:

  - You are about to drop the column `userId` on the `Attachment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedUserId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "userId",
ALTER COLUMN "fileName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "assignedUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
