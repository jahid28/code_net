"use client";
import PostBox from "@/components/PostBox";
import AllPosts from "@/components/AllPosts";
export default function Home() {



  return (
    <>
    {/* <Tags/> */}
    <div className="fixed bottom-24 right-8 md:bottom-6 md:right-8 z-[200]">
    <PostBox/>
    </div>

    <AllPosts/>
    </>
  );
}
