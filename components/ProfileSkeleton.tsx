import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="w-full mb-6">
      <div className="lg:hidden grid place-items-center">
        <Skeleton className="h-36 w-36 rounded-full" />

        <Skeleton className="h-4 mt-3 w-32 rounded-lg" />
        <Skeleton className="h-4 mt-3 w-32 rounded-lg" />

        <div className="flex items-center mt-4">
          <Skeleton className="h-4 w-[20vw] rounded-lg" />
          <Skeleton className="h-4 w-[25vw] ml-16 rounded-lg" />
          <Skeleton className="h-4 w-[20vw] ml-16 rounded-lg" />
        </div>
      </div>

      <div className="hidden lg:flex items-center">
        <Skeleton className="h-36 w-36 rounded-full" />
        <Skeleton className="h-8 w-24 ml-4 rounded-lg" />
        <Skeleton className="h-6 w-36 ml-[4vw] rounded-lg" />
        <Skeleton className="h-6 w-36 ml-[6vw] rounded-lg" />
        <Skeleton className="h-6 w-24 ml-[6vw] mr-[6vw] rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-6 ml-[6vw] rounded-full" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
