"use client";
import MakeCommentPage from "@/components/page/makeCommentPage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiHeart, BiSolidHeart, BiSolidTrash } from "react-icons/bi";
import { dateFormatter } from "@/lib/dateFormatter";
import BackButton from "@/components/ui/BackButton";
import { useToast } from "@/components/ui/use-toast";
import CurhatanDetailLoading from "@/components/loading/curhatanDetailLoading";
import { useUserSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { addLike, removeLike } from "@/utils/LikeService";
import { FiTrash } from "react-icons/fi";

type Curhatan = {
  id: number;
  title: string;
  content: string;
  userEmail: string;
  userUuid: string;
  createdAt: string;
  uuid: string;
  user: {
    username: string;
    pfpUrl: string;
  };
  comments: commentList[];
  likes: number;
};

type commentList = {
  id: number;
  content: string;
  userEmail: string;
  userUuid: string;
  postId: string;
  uuid: string;
  createdAt: string;
  user: {
    username: string;
    pfpUrl: string;
  };
  likes: number;
};

export default function CurhatanDetail({ params }: any) {
  const { user }: any = useUserSession();
  const userUuid = user?.uuid;

  const toaster = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [likedHistoryLoading, setLikedHistoryLoading] = useState(true);
  const [curhatan, setCurhatan] = useState<Curhatan>({} as Curhatan);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [likedAnimate, setLikedAnimate] = useState({
    liked: false,
    id: "",
  });

  const curhatanUuid = params.slug;

  const isAuthor = curhatan?.userUuid === userUuid;

  const handleLikeAnimate = (uuid: string) => {
    setLikedAnimate({ liked: true, id: uuid });
    setTimeout(() => {
      setLikedAnimate({ liked: false, id: uuid });
    }, 3000);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      if (!curhatanUuid) {
        return;
      }

      const response = await fetch(
        `/api/curhatan-detail?curhatanId=${curhatanUuid}`
      );

      if (!response.ok) {
        setIsLoading(false);
        setError(true);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      setCurhatan(data);

      if (!userUuid) {
        setLikedComments([]);
        setLikedPosts([]);
        setLikedHistoryLoading(false);
        return;
      }

      setLikedHistoryLoading(true);
      const likeHistoryResponse = await fetch(`/api/like-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUuid }),
      });

      const likeHistoryData = await likeHistoryResponse.json();
      setLikedHistoryLoading(false);

      const likedPostIds = likeHistoryData.postsLiked || [];
      setLikedPosts(likedPostIds);

      const likedCommentIds = likeHistoryData.commentsLiked || [];
      setLikedComments(likedCommentIds);
    };

    fetchDetail();
  }, [curhatanUuid, userUuid]);

  const handleAddLike = async (
    uuid: string,
    userUuid: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userUuid) {
      toaster.toast({
        title: "Failed to add like",
        description: "Please login first",
      });
      return;
    }

    const result = await addLike(uuid, userUuid, postOrComment);

    if (!result.success) {
      console.error("Failed to add like");
      toaster.toast({
        title: "Failed to add like",
        description: "Please try again later",
      });
      return;
    }

    if (postOrComment === "post") {
      setCurhatan({ ...curhatan, likes: curhatan?.likes + 1 });
      setLikedPosts([...likedPosts, uuid]);

      handleLikeAnimate(uuid);
    } else if (postOrComment === "comment") {
      setCurhatan({
        ...curhatan,
        comments: curhatan?.comments.map((comment) =>
          comment.uuid === uuid
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        ),
      });
      setLikedComments([...likedComments, uuid]);

      handleLikeAnimate(uuid);
    }
  };

  const handleRemoveLike = async (
    uuid: string,
    userUuid: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userUuid) {
      return;
    }

    const result = await removeLike(uuid, userUuid, postOrComment);

    if (!result.success) {
      console.error("Failed to remove like");
      toaster.toast({
        title: "Failed to remove like",
      });
      return;
    }

    if (postOrComment === "post") {
      setCurhatan({ ...curhatan, likes: curhatan?.likes - 1 });
      setLikedPosts(likedPosts.filter((id) => id !== uuid));
    } else if (postOrComment === "comment") {
      setCurhatan({
        ...curhatan,
        comments: curhatan?.comments.map((comment) =>
          comment.uuid === uuid
            ? { ...comment, likes: comment.likes - 1 }
            : comment
        ),
      });
      setLikedComments(likedComments.filter((id) => id !== uuid));
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!userUuid) {
      return;
    }

    const yes = confirm("Are you sure you want to delete this comment?");
    if (!yes) {
      return;
    }

    const res = await fetch("/api/update-comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, userUuid }),
    });

    if (!res.ok) {
      console.error("Failed to delete comment");
      toaster.toast({
        title: "Failed to delete comment",
        description: "Please try again later",
      });
      return;
    }

    setCurhatan({
      ...curhatan,
      comments: curhatan?.comments.filter(
        (comment) => comment.uuid !== commentId
      ),
    });
  };

  if (!curhatan || error) {
    return (
      <div className="text-red-500 w-full h-80 flex flex-col items-center justify-center">
        Curhatan not found
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-neutral-700 text-white rounded-md"
        >
          Home
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <CurhatanDetailLoading />;
  }

  return (
    <div>
      <BackButton to="home" />

      <div className="border-b mb-2 md:border-none md:md-0">
        <div className="flex items-center">
          <Image
            src={curhatan?.user?.pfpUrl}
            width={100}
            height={100}
            alt="pfp"
            className="rounded-full w-12 h-12 md:w-14 md:h-14"
          />
          <span className="ml-4">
            <p className="font-bold">{curhatan?.user?.username}</p>
            <p className="text-gray-500 text-sm">
              {dateFormatter(curhatan?.createdAt)}
            </p>
          </span>
        </div>
        <div className="my-4">
          <h1 className="text-lg font-semibold">{curhatan?.title}</h1>
          <p>{curhatan?.content}</p>
        </div>
        <button
          onClick={() =>
            likedPosts.includes(curhatan.uuid)
              ? handleRemoveLike(curhatan.uuid, userUuid, "post")
              : handleAddLike(curhatan.uuid, userUuid, "post")
          }
          disabled={likedHistoryLoading}
          className="disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
        >
          <span
            className={`inline-flex items-center ${
              likedHistoryLoading ? "animate-pulse " : ""
            }`}
          >
            {likedPosts.includes(curhatan.uuid) ? (
              <BiSolidHeart
                className={`mr-1 text-red-500 rounded-full p-1  hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                  likedAnimate.liked &&
                  likedAnimate.id === curhatan.uuid &&
                  "animate-fade-scale"
                }`}
                size={40}
              />
            ) : (
              <BiHeart
                className="mr-1  rounded-full p-1 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 "
                size={40}
              />
            )}
            {!likedHistoryLoading && curhatan?.likes > 0
              ? curhatan.likes
              : null}
          </span>
        </button>
      </div>

      <div>
        {isLoading ? (
          <span className="block w-full h-6 bg-neutral-400 rounded-md animate-pulse"></span>
        ) : (
          <MakeCommentPage postId={curhatan.uuid} userUuid={userUuid} />
        )}
      </div>

      <div className="w-full">
        <h2>
          {curhatan?.comments?.length === 0
            ? "No comments"
            : "Comments : " + curhatan?.comments?.length}
        </h2>

        {curhatan?.comments?.map((comment) => (
          <div
            key={comment.uuid}
            className="border rounded-2xl p-4 my-4 flex items-center justify-between"
          >
            <div className="inline-flex items-center">
              <Image
                src={comment.user.pfpUrl}
                alt="pfp"
                width={100}
                height={100}
                className="rounded-full w-12 h-12 self-start "
              />
              <div className="ml-4">
                <span className="inline-flex items-center gap-2">
                  <p className="font-bold">{comment.user.username}</p>
                  <p
                    className="text-xs md:text-sm line-clamp-1 text-gray-500"
                    title={dateFormatter(comment.createdAt)}
                  >
                    {dateFormatter(comment.createdAt)}
                  </p>
                </span>
                <p className="font-medium">{comment.content}</p>
              </div>
            </div>

            <div className="flex items-baseline justify-center gap-2 ml-4 h-full">
              <button
                onClick={() =>
                  likedComments.includes(comment.uuid)
                    ? handleRemoveLike(comment.uuid, userUuid, "comment")
                    : handleAddLike(comment.uuid, userUuid, "comment")
                }
                disabled={likedHistoryLoading}
                className="disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
              >
                <span
                  className={`inline-flex items-center ${
                    likedHistoryLoading ? "animate-pulse" : ""
                  }`}
                >
                  {likedComments.includes(comment.uuid) ? (
                    <BiSolidHeart
                      className={`mr-1 text-red-500 rounded-full p-1  hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                        likedAnimate.liked &&
                        likedAnimate.id === comment.uuid &&
                        "animate-fade-scale"
                      }`}
                      size={40}
                    />
                  ) : (
                    <BiHeart
                      className="mr-1  rounded-full p-1 text-neutral-700 dark:text-neutral-300  hover:bg-neutral-100 dark:hover:bg-neutral-800 "
                      size={40}
                    />
                  )}
                  {!likedHistoryLoading && comment?.likes > 0
                    ? comment.likes
                    : null}
                </span>
              </button>
              {/* {isAuthor && (
                <button
                  onClick={() => deleteComment(comment.uuid)}
                  className="hover:scale-105 transition-all duration-300"
                >
                  <FiTrash
                    className="mr-1  rounded-full p-1  hover:bg-neutral-100 "
                    size={40}
                  />
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
