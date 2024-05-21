import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
// import PostSkeleton from "./PostSkeleton";
import PostSkeleton from "./PostSkeleton";
const AllPosts = () => {

  const [loading, setLoading] = useState<boolean>(false);
const [myName, setMyname] = useState<string>("");
  interface getPostInterface extends postInterface {
    _id: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);

  useEffect(() => {
   try {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/getPosts", {
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
    };

    fetchData();

    const fetchData2 = async () => {
      try {
        const res = await fetch("/api/getFollowingList", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          // body: JSON.stringify({
          //   user,
          // }),
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.msg);
        } else {
          setMyname(data.userName);
          setFollowingList(data.data);
        }
      } catch (error: any) {
        toast.error(error);
      }
    };
    fetchData2();
   } catch (error:any) {
    toast.error(error);
   }
  }, []);

  return (
    <div className="border-2 border-red-700 grid place-items-center">
      {/* <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      /> */}

<div className="border-x-0 border-green-600 w-[90vw] md:w-[50vw] mb-6">
        {loading &&
          <div>
            <PostSkeleton/>
          <br />
          <br />
          <PostSkeleton/>
          <br />
          <br />
          <PostSkeleton/>
          <br />
          <br />
          <PostSkeleton/>
          </div>
  
       }

      {!loading && posts.map((e, index) => {
        return (
          <SinglePost data={e} myName={myName} followingList={followingList}/>
        );
      })
    }
    </div>
    
    </div>
  );
};

export default AllPosts;
