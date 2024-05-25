"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostSkeleton from "@/components/PostSkeleton";
import { toast } from "sonner";
import SinglePost from "@/components/SinglePost";
import { postInterface } from "@/lib/interfaces";
import SingleProfile from "@/components/SingleProfile";
const page = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [myName, setMyname] = useState<string>("");

  interface getPostInterface extends postInterface {
    _id: string;
  }
  interface profileInterface {
    name: string;
    userName: string;
    profilePic: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [profiles, setProfiles] = useState<profileInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);

  let query = searchParams.query;
  if (query === undefined) {
    router.replace("/");
  }
  query = query.trim();
  if (query === "") {
    router.replace("/");
  }
  query = query.replace(/\s+/g, " ");
  let queryArray = query.split(" ");

  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch("/api/searchQuery", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ queryArray }),
        });
        // console.log("logged in ")
        const data = await response.json();
        if (data.success === false) {
          toast.error(data.msg);
          setLoading(false);
          return;
        }
        setLoading(false);
        setPosts(data.postArray);
        setProfiles(data.profileArray);

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
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  // finalQuery = finalQuery.replace(/ /g, '-');
  return (
    <div className="border-2 border-red-700 grid place-items-center">
      <div className="border-x-0 border-green-600 w-[90vw] md:w-[50vw] mb-6">
        {loading && (
          <div>
            <PostSkeleton />
            <br />
            <br />
            <PostSkeleton />
            <br />
            <br />
            <PostSkeleton />
            <br />
            <br />
            <PostSkeleton />
          </div>
        )}

        {!loading &&
          profiles.map((e, index) => {
            return (
              <SingleProfile
                name={e.name}
                userName={e.userName}
                profilePic={e.profilePic}
              />
            );
          })}

        {!loading &&
          posts.map((e, index) => {
            return (
              <SinglePost
                data={e}
                myName={myName}
                followingList={followingList}
              />
            );
          })}
      </div>
    </div>
  );
};

export default page;
