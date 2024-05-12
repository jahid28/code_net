"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState, ChangeEvent } from "react";
// import { cookies } from 'next/headers'
// import { getCookie } from 'cookies-next';
import ClipLoader from "react-spinners/ClipLoader";
import PostBox from "@/components/PostBox";

export default function Home() {

  const [c, setC] = useState<string | undefined>("nope");
  useEffect(() => {
    const val = getCookie("userName");
    setC(val);
  }, []);


  return (
    <>
    <div className="mt-20">

   
    </div>
    <div className="fixed bottom-24 right-8 md:bottom-6 md:right-8">
    <PostBox/>
    </div>
      <div className="bg-color text-color mt-28">{c}</div>
    </>
  );
}
