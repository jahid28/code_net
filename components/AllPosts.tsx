// "use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";

interface getPostInterface extends postInterface {
  _id: string;
}

const AllPosts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [redisPostList, setRedisPostList] = useState<string[]>([]);
  const [loadNumber, setLoadNumber] = useState<number>(1);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: Response = await fetch("/api/getPosts", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }

      setPosts(data.data);
      setRedisPostList(data.redisPostList);
      setLoading(false);
    } catch (error) {
      toast.error(String(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // var localLoading:boolean=false

  const handleScroll = async (): Promise<void> => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      // !localLoading &&
      redisPostList.length > loadNumber * 10
    ) {
      setLoadNumber((prev) => prev + 1);
      setLoading(true);

      const res: Response = await fetch("/api/loadMorePosts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ redisPostList, loadNumber }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }
      
      setPosts((prev) => [...prev, ...data.data]);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [redisPostList, loadNumber]);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {((!loading && loadNumber === 1) || loadNumber != 1) &&
          posts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {loading && <PostSkeleton />}
      </div>
    </div>
  );
};

export default AllPosts;
