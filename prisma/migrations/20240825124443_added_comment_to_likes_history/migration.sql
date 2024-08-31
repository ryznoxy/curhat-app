/*
  Warnings:

  - Added the required column `commentId` to the `LikeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LikeHistory" ADD COLUMN     "commentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
