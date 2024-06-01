"use client";
import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";
const AllPosts = (props:any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myName, setMyname] = useState<string>("");
  interface getPostInterface extends postInterface {
    _id: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [redisPostList, setRedisPostList] = useState<string[]>([]);
  const [loadNumber, setLoadNumber] = useState<number>(1);

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

  const fetchData = async () => {
    try {
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
      setRedisPostList(data.redisPostList);

      setLoading(false);
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      myName != "" &&
      redisPostList.length > loadNumber * 10
    ) {
      // alert('You have reached the bottom of the page!');

      setLoadNumber((prev) => prev + 1);
      setLoading(true);

      const res = await fetch("/api/loadMorePosts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ redisPostList, loadNumber }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }

      setPosts((prev) => [...prev, ...data.data]);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [myName, redisPostList, loadNumber]);


//   function filterPosts(posts:any, tags:any) {
//     return posts.filter((post:any) => tags.includes(post.language) || tags.includes(post.type));
// }


//   useEffect(() => {
//     let tags = props.tags;
//     if (tags != '' && tags!=undefined) {

//       // setPosts(searchParams);

//       tags = tags.trim();
//       if (tags === "") {
//         tags.replace("/");
//       }
//       // tags = tags.replace(/\s+/g, " ");
//       let tagsArr = tags.split("-");
//       console.log("tagArr",tagsArr,posts.length)

//       // Get the filtered posts
//       // setPosts(filterPosts(posts, tagsArr));
//       setPosts(()=>posts.filter((post:any) => tagsArr.includes(post.lang) || tagsArr.includes(post.codeType)));
//     }
//     else{
//       console.log("hoooooo")
//     }
//   }, [props.tags]);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {((!loading && loadNumber === 1) || loadNumber != 1) &&
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

        {loading && <PostSkeleton />}
      </div>
    </div>
  );
};

export default AllPosts;
