"use client";
import PostBox from "@/components/PostBox";
import AllPosts from "@/components/AllPosts";
import Tags from "@/components/Tags";
import { useEffect, useState } from "react";
// useState
// interface PageProps {
//   searchParams: React.PropsWithChildren<{ tags: string }>;
// }

const Home: React.FC = () => {
  // const [tagParams, setTagParams] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log("main page effect");
  //   let tags: string = searchParams.tags;
  //   if (tags === undefined || tags.trim() === "") {
  //     setTagParams([]);
  //   } else {
  //     setTagParams(tags.split("-"));
  //   }

  // }, [searchParams.tags]);

  return (
    <>
      <Tags/>
      <div className="fixed bottom-16 right-4 md:bottom-6 md:right-8 z-[200]">
        <PostBox />
      </div>
      <AllPosts/>
    </>
  );
};

export default Home;
