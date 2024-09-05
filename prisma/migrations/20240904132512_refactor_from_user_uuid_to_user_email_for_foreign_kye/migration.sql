/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LikeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,postId]` on the table `LikeHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail,commentId]` on the table `LikeHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `LikeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropIndex
DROP INDEX "LikeHistory_userId_commentId_key";

-- DropIndex
DROP INDEX "LikeHistory_userId_postId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LikeHistory" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userEmail_postId_key" ON "LikeHistory"("userEmail", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userEmail_commentId_key" ON "LikeHistory"("userEmail", "commentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
