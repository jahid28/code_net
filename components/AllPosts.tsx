// "use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { storeAllPostsActionFunc } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { set } from "mongoose";

// import { it } from "node:test";
interface getPostInterface extends postInterface {
  _id: string;
}

const AllPosts: React.FC = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [tagPosts, setTagPosts] = useState<getPostInterface[]>([]);
  // const [redisPostList, setRedisPostList] = useState<string[]>([]);
  // const [totalPosts, setTotalPosts] = useState<number>(0);
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

  // let redisPostList: string[] =[]

  // if(redisPostList.length===0){
  //   console.log("useSelector")
  //   redisPostList=useSelector(
  //     (state: any) => state.reducer1.redisPostList
  //   );
  // }

  // useEffect(() => {
  //   if (totalPosts === 0) {

  //     setTotalPosts(redisPostList.length);
  //     // dispatch({ type: "storeAllPostsReducer", payload: [] });
  //   }
  // }, [redisPostList]);

  const temp = useSelector((state: any) => state.reducer1.redisPostList);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log("res temp list", temp);
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
        // setRedisPostList(data.redisPostList);
      }
      // setPosts(data.data);
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
      // setLoading(true);
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
        // setLoading(false);
        return;
      }
      setLoadNumber((prev) => prev + 1);
      // setPosts(data.data);
      setPosts((prev) => [...prev, ...data.data]);
      // setLoading(false);
    } catch (error) {
      toast.error(String(error));
    }
    // setItems([...items, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  };

  // const handleScroll = async (): Promise<void> => {
  //   // console.log("scrolling");
  //   // if (
  //   //   window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //   //   // !localLoading &&
  //   //   redisPostList.length > loadNumber * 10
  //   // ) {
  //   //   console.log("scrolling end");
  //   console.log("loadddd");
  //   setLoadNumber((prev) => prev + 1);
  //   // setLoading(true);

  //   const res: Response = await fetch("/api/loadMorePosts", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ redisPostList, loadNumber }),
  //   });
  //   const data = await res.json();
  //   if (data.success === false) {
  //     toast.error(data.msg);
  //     // setLoading(false);
  //     return;
  //   }

  //   setPosts((prev) => [...prev, ...data.data]);
  //   // setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   if (loading === false && searchParams.get("tags") === null) {
  //     window.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [redisPostList, loadNumber, searchParams, loading]);

  // const [items, setItems] = useState([
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  //   "10",
  // ]);

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
          !loading &&
          tagPosts.length > 0 &&
          tagPosts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {/* {((!loading && loadNumber === 1) || loadNumber != 1) &&
          searchParams.get("tags") === null &&
          // tagPosts.length === 0 &&
          posts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })} */}

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
