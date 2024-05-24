"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { postInterface } from "@/lib/interfaces";
import SinglePost from "@/components/SinglePost";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";
import { Player } from "@lordicon/react";
// useRef
// import { set } from "mongoose";
// import getPostInter// import { AuthContext } from "../../layout";
const page = ({ params }: { params: any }) => {
  interface getPostInterface extends postInterface {
    _id: string;
  }

  const playerRefShare = useRef<Player>(null);
  const share = require("@/icons/share.json");

  const playerRefAt = useRef<Player>(null);
  const at = require("@/icons/at.json");

  // const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [myName, setMyname] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>({});
  const userName = params.userName;

  async function getUserPosts() {
    try {
      setLoading(true);
      const response = await fetch("/api/getUserPosts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });
      const data = await response.json();
      if (data.success == false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }
      setPosts(data.data);
      setFollowingList(data.followingList);
      setMyname(data.myName);
      setUserDetails(data.userDetails);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching user posts");
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserPosts();
    //  console.log("useeffect")
  }, []);

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div className="border-0 border-red-700 grid place-items-center">
      {/* <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      /> */}

      {!loading && isEmpty(userDetails) && (
        <div className="text-2xl text-color font-extrabold">No User found!</div>
      )}
      {!loading && !isEmpty(userDetails) && (
        <div                
        className="border-0 border-white w-full grid place-items-center lg:flex items-center text-color mb-4 border-b-2 pb-3">
          <Image
            className="rounded-full mr-4 ml-2"
            src={userDetails.profilePic}
            width={120}
            height={120}
            alt="profile pic"
          />

          <div  onMouseEnter={() => playerRefAt.current?.playFromBeginning()}>
            <p className="text-2xl font-bold">{userDetails.name}</p>
            <div className="text-xl opacity-50 flex">
              
                <Player
                  colorize={"var(--icon-color)"}
                  ref={playerRefAt}
                  size={26}
                  icon={at}
                />

             <p> {userDetails.userName}</p>
            </div>
          </div>
          <div className="flex text-lg lg:text-2xl mt-2 lg:mt-0 font-bold">
            <p className="ml-[6vw]">
              Followers : {userDetails.followers.length}
            </p>
            <p className="ml-[6vw]">
              Following : {userDetails.following.length}
            </p>
            <p className="ml-[6vw]">{posts.length} Posts</p>

            <div
              onMouseEnter={() => playerRefShare.current?.playFromBeginning()}
              onClick={() => {
                navigator.clipboard
                  .writeText(`localhost:3000/account/${userName}`)
                  .then(() => {
                    toast.success("Profile link copied!");
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
              }}
              className="ml-[6vw] cursor-pointer"
            >
              <Player
                colorize={"var(--icon-color)"}
                ref={playerRefShare}
                size={30}
                icon={share}
              />
            </div>
          </div>
        </div>
      )}

      <div className="border-x-0 border-yellow-600 w-[98vw] md:w-[50vw] mb-6">
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
          posts.length > 0 &&
          !isEmpty(userDetails) &&
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
      </div>

      {!loading && posts.length == 0 && !isEmpty(userDetails) && (
        <div className="text-2xl text-center text-color font-extrabold">
          No posts found!
        </div>
      )}
    </div>
  );
};

export default page;
