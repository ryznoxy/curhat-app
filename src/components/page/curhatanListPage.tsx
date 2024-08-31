"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiSolidHeart,
  BiTrash,
} from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { dateFormatter } from "@/lib/dateFormatter";
import { useToast } from "../ui/use-toast";
import CurhatanListsLoading from "../loading/curhatanListsLoading";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type CurhatanList = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  uuid: string;
  user: {
    username: string;
    pfpUrl: string;
    userEmail: string;
  };
  commentLength: number;
  likes: number;
};

export default function CurhatanListPage({ user }: any) {
  const [curhatanLists, setCurhatanLists] = useState<CurhatanList[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedHistoryLoading, setLikedHistoryLoading] = useState(true);

  const toaster = useToast();

  const userId = user?.uuid;

  const isAuthor = (uuid: string) => {
    return uuid === userId;
  };

  useEffect(() => {
    const fetchCurhatans = async () => {
      setIsLoading(true);
      const response = await fetch("/api/curhatan-lists");
      const data = await response.json();
      setIsLoading(false);
      setCurhatanLists(data);
    };
    fetchCurhatans();
  }, []);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (!userId) {
        setLikedPosts([]);
        setLikedHistoryLoading(false);
        return;
      }

      setLikedHistoryLoading(true);
      await userId;
      const likeHistoryResponse = await fetch(
        `/api/like-history?userId=${userId}`
      );

      const likeHistoryData = await likeHistoryResponse.json();

      const likedPostIds = likeHistoryData.postsLiked || [];
      setLikedPosts(likedPostIds);
      setLikedHistoryLoading(false);
    };
    fetchLikedPosts();
  }, [userId]);

  const addLike = async (
    uuid: string,
    userId: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userId) {
      toaster.toast({
        title: "Failed to add like",
        description: "Please login first",
      });
      return;
    }

    const respone = await fetch("/api/update-like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userId, postOrComment }),
    });

    if (!respone.ok) {
      console.error("Failed to add like");
      toaster.toast({
        title: "Failed to add like",
        description: "Please try again later",
      });
      return;
    }

    if (postOrComment === "post") {
      setCurhatanLists((prev) =>
        prev.map((curhatan) =>
          curhatan.uuid === uuid
            ? { ...curhatan, likes: curhatan.likes + 1 }
            : curhatan
        )
      );
      setLikedPosts([...likedPosts, uuid]);
    }
  };

  const removeLike = async (
    uuid: string,
    userId: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userId) {
      return;
    }

    const response = await fetch("/api/update-like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userId, postOrComment }),
    });

    if (!response.ok) {
      console.error("Failed to remove like");
      toaster.toast({
        title: "Failed to remove like",
        description: "Please try again later",
      });
      return;
    }

    if (postOrComment === "post") {
      setCurhatanLists((prev) =>
        prev.map((curhatan) =>
          curhatan.uuid === uuid
            ? { ...curhatan, likes: curhatan.likes - 1 }
            : curhatan
        )
      );
      setLikedPosts(likedPosts.filter((id) => id !== uuid));
    }
  };

  const deletePost = async (uuid: string) => {
    if (!userId) {
      return;
    }

    const yes = confirm("Are you sure you want to delete this post?");
    if (!yes) {
      return;
    }

    await fetch("/api/update-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userId }),
    });

    setCurhatanLists((prev) =>
      prev.filter((curhatan) => curhatan.uuid !== uuid)
    );
  };

  if (isLoading) return <CurhatanListsLoading />;

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {curhatanLists?.map((curhatan: CurhatanList) => (
          <div
            key={curhatan.uuid}
            className="border rounded-2xl my-4 p-4 w-full"
          >
            <div className="flex items-center w-full">
              <Image
                src={curhatan.user.pfpUrl}
                alt="pfp"
                width={100}
                height={100}
                className="rounded-full w-12 h-12 md:w-14 md:h-14"
              />
              <span className="ml-4 ">
                <p className="font-semibold text-lg">
                  {curhatan.user.username}
                </p>

                <p className="text-sm text-gray-500">
                  {dateFormatter(curhatan.createdAt)}
                </p>
              </span>
            </div>
            <div className="mt-4">
              <p className="font-bold">{curhatan.title}</p>
              <p>{curhatan.content}</p>
            </div>

            <div className="flex gap-4 mt-4 transition-all duration-300 ">
              <div className="">
                <button
                  onClick={() =>
                    likedPosts.includes(curhatan.uuid)
                      ? removeLike(curhatan.uuid, userId, "post")
                      : addLike(curhatan.uuid, userId, "post")
                  }
                  disabled={likedHistoryLoading}
                  className="disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
                >
                  <span
                    className={`inline-flex items-center ${
                      likedHistoryLoading ? "animate-pulse" : ""
                    }`}
                  >
                    {likedPosts.includes(curhatan.uuid) ? (
                      <BiSolidHeart className="mr-1 text-red-500" size={32} />
                    ) : (
                      <BiHeart className="mr-1" size={32} />
                    )}
                    {!likedHistoryLoading && curhatan?.likes > 0
                      ? curhatan.likes
                      : null}
                  </span>
                </button>
              </div>
              <Link
                href={`/curhatan-detail/${curhatan.uuid}`}
                className="inline-flex items-center mb-1 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <FiMessageCircle size={28} className="mr-1" />
                <h1>
                  {curhatan.commentLength === 0 ? null : curhatan.commentLength}
                </h1>
              </Link>
              {isAuthor(curhatan.userId) && (
                <button
                  className="ml-auto  w-fit text-center mb-1 hover:scale-105 transition-transform duration-300 ease-in-out text-red-500 "
                  onClick={() => deletePost(curhatan.uuid)}
                >
                  <BiTrash className="inline mr-1" size={28} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
