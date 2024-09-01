"use client";
import React, { useState } from "react";
import { z } from "zod";
import BackButton from "../ui/BackButton";

export default function MakeCurhatanPage({ user }: any) {
  const userId = user?.uuid;

  const [errorMessages, setErrorMessages] = useState<{
    title?: string;
    content?: string;
  }>({});

  const postSchema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(3, {
        message: "Title must be at least 3 characters",
      }),
    content: z
      .string({
        required_error: "Content is required",
      })
      .min(5, {
        message: "Content must be at least 5 characters",
      }),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const result = postSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.format();

      setErrorMessages({
        title: errors.title?._errors[0],
        content: errors.content?._errors[0],
      });

      return;
    }

    setErrorMessages({});

    const { title, content } = result.data;

    if (!userId) {
      return;
    }

    const res = await fetch("/api/make-curhatan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        userId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to make curhatan");
      return;
    }

    window.location.pathname = "/";
  };

  if (!userId) {
    return null;
  }

  return (
    <div>
      <BackButton to="home" />
      <div className="my-6 space-y-6">
        <h1 className="text-xl text-center">Make a Curhatan</h1>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border rounded-sm px-2 py-1 w-full"
              placeholder="Title..."
            />

            {errorMessages.title && (
              <p className="text-red-500 text-sm">{errorMessages.title}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="content" className="block">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              className="border w-full rounded-sm px-2 py-1 h-20"
              placeholder="Content..."
            />

            {errorMessages.content && (
              <p className="text-red-500 text-sm">{errorMessages.content}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 border rounded-xl bg-neutral-700 text-white"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
