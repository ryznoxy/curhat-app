/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `LikeHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_postId_fkey";

-- AlterTable
ALTER TABLE "LikeHistory" ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "commentId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userId_commentId_key" ON "LikeHistory"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
