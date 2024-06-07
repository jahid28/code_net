"use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "@/components/SinglePost";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";

interface getPostInterface extends postInterface {
  _id: string;
}

const AllPosts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [posts, setPosts] = useState<getPostInterface[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: Response = await fetch("/api/getNotifications", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify(result),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }

      setPosts(data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(String(error));
    }
  };

  var toPreventStrictMode: boolean = true;

  useEffect((): void => {
    if (toPreventStrictMode) {
      toPreventStrictMode = false;
      fetchData();
      return;
    }
  }, []);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {loading && <PostSkeleton />}

        {!loading &&
          posts.length > 0 &&
          posts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {!loading && posts.length === 0 && (
          <div className="grid place-items-center ">
            <Image
              className="mt-10 mb-4"
              src="/empty.png"
              width={300}
              height={300}
              alt="404"
            />
            <p className="text-2xl font-bold text-center">NO NOTIFICATIONS</p>
            <p className="text-xl font-medium text-center">
              You will get notifications when someone you follow posts
              something.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
