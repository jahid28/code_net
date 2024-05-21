"use client";
import SinglePost from "@/components/SinglePost";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { set } from "mongoose";
// import PostSkeleton from "@/components/PostSkeleton";
import PostSkeleton from "@/components/PostSkeleton";
// useState
// useRef
import { Player } from "@lordicon/react";
const page = ({ params }: { params: any }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [userName, setUserName] = useState<string>("");
  const [followingList, setFollowingList] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/getSinglePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: params.postID }),
      });

      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }

      setData(data.data);
      setUserName(data.userName);
      setFollowingList(data.followingList);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="border-2 border-red-700 grid place-items-center">
        {/* <ClipLoader
          className="absolute top-[45vh] z-30"
          color="#e94154"
          loading={loading}
          size={100}
        /> */}
      <div className="border-2 border-green-600 w-[90vw] md:w-[50vw] mb-6">

      {loading &&
          <PostSkeleton/>
  
       }

        {!loading && data && <SinglePost data={data} myName={userName} followingList={followingList}/>}
        {!loading && !data &&  <p className="text-2xl text-color mt-8 font-bold text-center">Post Not Found</p>}
       
      </div>
    </div>
  );
};

export default page;
