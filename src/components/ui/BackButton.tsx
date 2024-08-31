import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function BackButton({ to }: { to: "home" | "back" }) {
  return (
    <div
      className="border px-4 py-2 my-8 rounded-lg cursor-pointer inline-flex items-center"
      onClick={() =>
        to === "home" ? window.location.replace("/") : history.back()
      }
    >
      <BiArrowBack className="mr-2" /> Back
    </div>
  );
}
