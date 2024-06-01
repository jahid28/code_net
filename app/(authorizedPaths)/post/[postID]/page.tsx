"use client";
import SinglePost from "@/components/SinglePost";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";

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
    <div className="grid place-items-center">
        {/* <ClipLoader
          className="absolute top-[45vh] z-30"
          color="#e94154"
          loading={loading}
          size={100}
        /> */}
      <div className="w-[90vw] md:w-[50vw] mb-6">

      {loading &&
          <PostSkeleton/>
  
       }

        {!loading && data && <SinglePost data={data} myName={userName} followingList={followingList}/>}
        {!loading && !data &&  
        <div className='grid place-items-center '>
        <Image className='mt-10 mb-4' src='/empty.png' width={300} height={300} alt='404' />
          <p className='text-2xl font-bold'>POST NOT FOUND</p>
        </div>
        }
       
      </div>
    </div>
  );
};

export default page;
