import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CurhatanListsLoading() {
  return (
    <div>
      <div className="flex  items-center gap-4">
        <Skeleton className="mb-4 w-14 h-14 rounded-full" />
        <Skeleton className="mb-4 w-32 h-10" />
      </div>
      <Skeleton className="mb-4 w-3/4 h-10" />
      <div className="flex  items-center gap-4">
        <Skeleton className="mb-4 w-14 h-14 rounded-full" />
        <Skeleton className="mb-4 w-32 h-10" />
      </div>
      <Skeleton className="mb-4 w-3/4 h-10" />
      <div className="flex  items-center gap-4">
        <Skeleton className="mb-4 w-14 h-14 rounded-full" />
        <Skeleton className="mb-4 w-32 h-10" />
      </div>
      <Skeleton className="mb-4 w-3/4 h-10" />
    </div>
  );
}
