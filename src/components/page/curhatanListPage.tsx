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
import useSWR from "swr";
import { ReasonList, report } from "@/services/Report";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

type CurhatanList = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userEmail: string;
  uuid: string;
  user: {
    username: string;
    pfpUrl: string;
  };
  commentLength: number;
  likes: number;
};

export default function CurhatanListPage({ user }: any) {
  const [curhatanLists, setCurhatanLists] = useState<CurhatanList[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [likedHistoryLoading, setLikedHistoryLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR("/api/curhatan-lists", fetcher);

  const toaster = useToast();

  const userEmail = user?.email;
  const userName = user?.name;

  const isAuthor = (email: string) => {
    return email === userEmail;
  };

  useEffect(() => {
    if (data) {
      setCurhatanLists(data);
    }
  }, [data]);

  // useEffect(() => {
  //   const fetchCurhatans = async () => {
  //     setIsLoading(true);
  //     const response = await fetch("/api/curhatan-lists", {
  //       cache: "no-store",
  //       next: {
  //         revalidate: 60,
  //       },
  //     });

  //     if (!response.ok) {
  //       setIsLoading(false);
  //       setError(true);
  //       return;
  //     }

  //     const data = await response.json();

  //     setIsLoading(false);
  //     setCurhatanLists(data);
  //   };
  //   fetchCurhatans();
  // }, []);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (!userEmail) {
        setLikedPosts([]);
        setLikedHistoryLoading(false);
        return;
      }

      setLikedHistoryLoading(true);
      await userEmail;
      const likeHistoryResponse = await fetch(`/api/like-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail }),
      });

      const likeHistoryData = await likeHistoryResponse.json();

      const likedPostIds = likeHistoryData.postsLiked || [];
      setLikedPosts(likedPostIds);
      setLikedHistoryLoading(false);
    };
    fetchLikedPosts();
  }, [userEmail]);

  const addLike = async (
    uuid: string,
    userEmail: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userEmail) {
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
      body: JSON.stringify({ uuid, userEmail, postOrComment }),
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
    userEmail: string,
    postOrComment: "post" | "comment"
  ) => {
    if (!userEmail) {
      return;
    }

    const response = await fetch("/api/update-like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userEmail, postOrComment }),
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
    if (!userEmail) {
      return;
    }

    const yes = confirm("Are you sure you want to delete this post?");
    if (!yes) {
      return;
    }

    const res = await fetch("/api/update-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userEmail }),
    });

    if (!res.ok) {
      console.error("Failed to delete post");
      toaster.toast({
        title: "Failed to delete post",
        description: "Please try again later",
      });
      return;
    }

    setCurhatanLists((prev) =>
      prev.filter((curhatan) => curhatan.uuid !== uuid)
    );
  };

  const handleReport = async ({ postId }: { postId: string }) => {
    if (!userEmail) {
      return;
    }
    const yes = confirm("Are you sure you want to report this post?");
    if (!yes) {
      return;
    }

    const reason = ReasonList[Math.floor(Math.random() * ReasonList.length)];

    const reportRespone = await report(postId, userName, userEmail, reason);
    if (reportRespone && reportRespone.isError) {
      toaster.toast({
        title: "Failed to report post",
        description: "Please try again later",
      });
      setIsOpen(false);
      return;
    } else {
      toaster.toast({
        title: "Post reported",
        description: "Thank you for your report",
      });
      setIsOpen(false);
      return;
    }
  };

  if (error)
    return <p className="text-red-500">Failed to load curhatan lists</p>;
  if (isLoading) return <CurhatanListsLoading />;

  return (
    <div>
      <div>
        {curhatanLists?.length === 0 && (
          <p className="text-center">Curhatan lists not found</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {curhatanLists?.map((curhatan: CurhatanList) => (
          <div
            key={curhatan.uuid}
            className="border rounded-2xl my-4 p-4 w-full relative"
          >
            <div className="absolute top-6 right-6">
              <Dialog onOpenChange={(open) => setIsOpen(open)}>
                <DialogTrigger>
                  <BiDotsHorizontalRounded size={24} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle>More</DialogTitle>
                    <DialogDescription>
                      What do you want to do with this post?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center gap-2 w-full">
                    <button
                      className="border w-full px-4 py-2 rounded-sm bg-blue-500 text-white"
                      onClick={() => handleReport({ postId: curhatan.uuid })}
                    >
                      Report
                    </button>
                    {isAuthor(curhatan.userEmail) && (
                      <button
                        className="border w-full px-4 py-2 rounded-sm bg-red-500 text-white"
                        onClick={() => deletePost(curhatan.uuid)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <button className="w-full sm:w-auto border px-4 py-2 rounded-sm">
                        Close
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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
                      ? removeLike(curhatan.uuid, userEmail, "post")
                      : addLike(curhatan.uuid, userEmail, "post")
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
              {/* {isAuthor(curhatan.userEmail) && (
                <button
                  className="ml-auto  w-fit text-center mb-1 hover:scale-105 transition-transform duration-300 ease-in-out text-red-500 "
                  onClick={() => deletePost(curhatan.uuid)}
                >
                  <BiTrash className="inline mr-1" size={28} />
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
