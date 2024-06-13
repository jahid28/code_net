// "use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
interface getPostInterface extends postInterface {
  _id: string;
}

// interface propsInterface {
//   // followingList: string[];
//   tagParams: string[];
// }

const AllPosts: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [tagPosts, setTagPosts] = useState<getPostInterface[]>([]);
  // const [tagsArr, setTagsArr] = useState<string[]>([]);
  const [redisPostList, setRedisPostList] = useState<string[]>([]);
  const [loadNumber, setLoadNumber] = useState<number>(1);

  const fetchTagsData = async (tagsArr: string[]): Promise<void> => {
    try {
      setLoading(true);
      const response: Response = await fetch("/api/tagSearch", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ tagsArr }),
      });
      const data = await response.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }
      setLoading(false);
      setTagPosts(data.postArray);
    } catch (error) {
      toast.error(String(error));
      setLoading(false);
    }
  };

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
    console.log("all posts useeffect");
    let tags: string | null = searchParams.get("tags");
    if (tags != null && tags.trim() != "") {
      // setTagsArr(tags.split("-"));
      fetchTagsData(tags.split("-"));
    } else {
      router.replace("/");
      setTagPosts([]);
      fetchData();
    }
  }, [searchParams]);

  // var localLoading:boolean=false

  const handleScroll = async (): Promise<void> => {
    console.log("scrolling");
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      // !localLoading &&
      redisPostList.length > loadNumber * 10
    ) {
      console.log("scrolling end");

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
    if (loading === false && searchParams.get("tags") === null) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [redisPostList, loadNumber, searchParams, loading]);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {searchParams.get("tags") != null &&
          !loading &&
          tagPosts.length === 0 && (
            <div className="grid place-items-center   ">
              <Image
                className="mt-10 mb-4"
                src="/empty.png"
                width={300}
                height={300}
                alt="404"
              />
              <p className="text-2xl font-bold">NO RESULTS</p>
            </div>
          )}

        {searchParams.get("tags") != null &&
          tagPosts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {((!loading && loadNumber === 1) || loadNumber != 1) &&
          searchParams.get("tags") === null &&
          // tagPosts.length === 0 &&
          posts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {loading && <PostSkeleton />}
      </div>
    </div>
  );
};

export default AllPosts;
