"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PostBox from "@/components/PostBox";
import AllPosts from "@/components/AllPosts";
import { useContext } from "react";
// import { AuthContext } from "./layout";
export default function Home() {
// const {name} = useContext(AuthContext)
// console.log("name",name)  
  // const [c, setC] = useState<string | undefined>("nope");
  // useEffect(() => {
  //   const val = getCookie("userName");
  //   setC(val);
  // }, []);

  


  return (
    <>
    <div className="fixed bottom-24 right-8 md:bottom-6 md:right-8">
    <PostBox/>
    </div>

    <AllPosts/>
    </>
  );
}
