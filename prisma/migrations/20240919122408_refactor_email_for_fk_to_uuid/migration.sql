/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `LikeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUuid,postId]` on the table `LikeHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userUuid,commentId]` on the table `LikeHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUuid` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `LikeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userEmail_fkey";

-- DropIndex
DROP INDEX "LikeHistory_userEmail_commentId_key";

-- DropIndex
DROP INDEX "LikeHistory_userEmail_postId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userEmail",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LikeHistory" DROP COLUMN "userEmail",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userEmail",
ADD COLUMN     "userUuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userUuid_postId_key" ON "LikeHistory"("userUuid", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userUuid_commentId_key" ON "LikeHistory"("userUuid", "commentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
