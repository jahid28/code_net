import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full items-center">
      <div className="flex items-center">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-6 w-20 ml-2 rounded-lg" />
      <Skeleton className="h-8 w-16 ml-2 rounded-lg" />
      <Skeleton className="h-6 w-28 ml-auto rounded-lg" />
      </div>
      
      <Skeleton className="h-4 mt-3 w-44 rounded-lg" />
      <Skeleton className="h-4 mt-3 w-60 sm:w-96 rounded-lg" />

      <div className="flex items-center mt-2">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-6 w-6 ml-16 rounded-full" />
      <Skeleton className="h-6 w-6 ml-16 rounded-full" />
      </div>
    </div>
  );
};

export default PostSkeleton;
