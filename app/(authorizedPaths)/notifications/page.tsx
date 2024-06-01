"use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "@/components/SinglePost";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";
const AllPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myName, setMyname] = useState<string>("");
  interface getPostInterface extends postInterface {
    _id: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);

  var toPreventStrictMode = true;

  useEffect(() => {
    try {
      if (toPreventStrictMode) {
        toPreventStrictMode = false;
        const fetchData = async () => {
          setLoading(true);
          const res = await fetch("/api/getNotifications", {
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
        return;
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="grid place-items-center">
      {/* <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      /> */}

      <div className="w-[90vw] md:w-[50vw] mb-6">
        {loading && (
         <PostSkeleton />
        )}

        {!loading &&
          posts.map((e, index) => {
            return (
              <SinglePost
              key={index}
              data={e}
              myName={myName}
              followingList={followingList}
              />
            );
          })}

          {!loading && posts.length === 0 && 
          <div className='grid place-items-center '>
          <Image className='mt-10 mb-4' src='/empty.png' width={300} height={300} alt='404' />
            <p className='text-2xl font-bold'>NO NOTIFICATIONS</p>
            <p className='text-xl font-medium'>You will get notifications when someone you follow posts something.</p>
            
          </div>
           }

      </div>
    </div>
  );
};

export default AllPosts;
