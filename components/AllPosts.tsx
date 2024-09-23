// "use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { storeAllPostsActionFunc } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";

interface getPostInterface extends postInterface {
  _id: string;
}

const AllPosts: React.FC = () => {
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [tagPosts, setTagPosts] = useState<getPostInterface[]>([]);
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


  const temp = useSelector((state: any) => state.reducer1.redisPostList);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: Response = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ redisPostList: temp }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }
      if (temp.length === 0) {
        dispatch(storeAllPostsActionFunc(data.redisPostList));
      }
      setPosts(data.data);

      setLoading(false);
    } catch (error) {
      toast.error(String(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    let tags: string | null = searchParams?.get("tags");
    if (tags != null && tags.trim() != "") {
      fetchTagsData(tags.split("-"));
    } else {
      setLoadNumber(1);
      setTagPosts([]);
      fetchData();
    }
  }, [searchParams]);


  const getMore = async () => {
    try {
      const res: Response = await fetch("/api/loadMorePosts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ redisPostList: temp,loadNumber }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        return;
      }
      setLoadNumber((prev) => prev + 1);
      setPosts((prev) => [...prev, ...data.data]);
    } catch (error) {
      toast.error(String(error));
    }
  };


  return (
    <div className="grid place-items-center">
      <div className="w-[95vw] md:w-[50vw] mb-6">
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
          !loading &&
          tagPosts.length > 0 &&
          tagPosts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}


        {loading && <PostSkeleton />}

        {((!loading && loadNumber === 1) || loadNumber != 1) &&
          searchParams.get("tags") === null && (
            <InfiniteScroll
              dataLength={posts.length} //This is important field to render the next data
              next={getMore}
              hasMore={posts.length < temp.length}
              loader={<PostSkeleton />}
              endMessage={
                <p className="mb-12 md:mb-2" style={{ textAlign: "center" }}>
                  <b>No more posts to display</b>
                </p>
              }
            >
              {posts.map((e: getPostInterface, index: number) => {
                return <SinglePost key={index} data={e} />;
              })}
            </InfiniteScroll>
          )}
      </div>
    </div>
  );
};

export default AllPosts;
