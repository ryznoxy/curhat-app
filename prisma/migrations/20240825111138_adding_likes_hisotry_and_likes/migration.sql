-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LikeHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikeHistory_userId_postId_key" ON "LikeHistory"("userId", "postId");

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
