-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikeHistory" DROP CONSTRAINT "LikeHistory_postId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeHistory" ADD CONSTRAINT "LikeHistory_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
