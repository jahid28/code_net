"use client";
import PostBox from "@/components/PostBox";
import AllPosts from "@/components/AllPosts";
export default function Home(): React.ReactElement {
  return (
    <>
      <div className="fixed bottom-16 right-4 md:bottom-6 md:right-8 z-[200]">
        <PostBox />
      </div>
      <AllPosts />
    </>
  );
}
