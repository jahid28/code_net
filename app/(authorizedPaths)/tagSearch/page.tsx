"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostSkeleton from "@/components/PostSkeleton";
import { toast } from "sonner";
import SinglePost from "@/components/SinglePost";
import { postInterface } from "@/lib/interfaces";
import SingleProfile from "@/components/SingleProfile";
import Image from "next/image";
const page = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [myName, setMyname] = useState<string>("");

  interface getPostInterface extends postInterface {
    _id: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);

 
  const fetchData = async () => {
    try {
        let tags = searchParams.tags;
        if (tags === undefined) {
          router.replace("/");
        }
        tags = tags.trim();
        if (tags === "") {
          router.replace("/");
        }
        let tagsArr = tags.split("-");
      
      setLoading(true);
      const response = await fetch("/api/tagSearch", {
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
      setPosts(data.postArray);
    } catch (error: any) {
      toast.error(error);
    }
  };

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

  useEffect(() => {
   fetchData2()
  }, []);

  useEffect(() => {
   fetchData()
  }, [searchParams.tags]);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {loading && <PostSkeleton />}
<h2>Tagsssssssssssssssssssssss</h2>
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

        {posts.length === 0 && !loading && (
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
      </div>
    </div>
  );
};

export default page;
