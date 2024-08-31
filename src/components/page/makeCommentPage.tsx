import React, { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useToast } from "../ui/use-toast";

const emojis = ["👍", "👎", "❤️", "😂", "😭", "😡", "🤬", "😩", "😥"];

export default function MakeCommentPage({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const toaster = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content");

    if (
      typeof content !== "string" ||
      content === "" ||
      postId === "" ||
      userId === "" ||
      !userId
    ) {
      return toaster.toast({
        title: "Error",
        description: "Please fill in all fields",
      });
    }

    const response = await fetch("/api/update-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, postId, userId }),
    });

    if (!response.ok) {
      console.error("Failed to make comment");
      toaster.toast({
        title: "Error",
        description: "Failed to make comment",
      });
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    window.location.reload();
  };

  return (
    <div className="my-4">
      <div>
        <div className="flex space-x-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value += emoji;
                }
              }}
              className="text-lg"
            >
              {emoji}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            id="content"
            name="content"
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Comment..."
            ref={inputRef}
          />

          <button
            type="submit"
            className="ml-1 p-2 border rounded-lg bg-neutral-700 text-white disabled:bg-neutral-300 disabled:cursor-not-allowed"
            disabled={postId === "" || userId === "" || !userId}
          >
            <IoSend className="text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
