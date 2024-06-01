"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { postInterface } from "@/lib/interfaces";
import SinglePost from "@/components/SinglePost";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";
import { Player } from "@lordicon/react";
import FollowComponent from "@/components/FollowComponent";
import ProfileSkeleton from "@/components/ProfileSkeleton";

const page = ({ params }: { params: any }) => {
  interface getPostInterface extends postInterface {
    _id: string;
  }

  const playerRefShare = useRef<Player>(null);
  const share = require("@/icons/share.json");

  const playerRefAt = useRef<Player>(null);
  const at = require("@/icons/at.json");

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
  }, []);

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div className="grid place-items-center">
      {!loading && isEmpty(userDetails) && (
        <div className="grid place-items-center ">
          <Image
            className="mt-10 mb-4"
            src="/empty.png"
            width={300}
            height={300}
            alt="404"
          />
          <p className="text-2xl font-bold">NO USER FOUND</p>
        </div>
      )}

      {loading && (
<ProfileSkeleton/>
      )}
      {/* {loading && !isEmpty(userDetails) && (
        <ProfileSkeleton/>
      )} */}

      {!loading && !isEmpty(userDetails) && (
        <div className="w-full grid place-items-center lg:flex items-center mb-4 pb-3">
          <div className="relative w-36 h-36 rounded-full overflow-hidden mr-4 cursor-pointer">
            <Image
              src={`${userDetails.profilePic}`}
              alt="profile Pic"
              layout="fill"
              className="object-center"
            />
          </div>

          <div onMouseEnter={() => playerRefAt.current?.playFromBeginning()}>
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
          <div className="flex justify-center flex-wrap text-lg lg:text-2xl mt-2 lg:mt-0 font-bold">
            <p className="ml-[6vw] mb-2">
              Followers : {userDetails.followers.length}
            </p>
            <p className="ml-[6vw] mb-2">
              Following : {userDetails.following.length}
            </p>
            <p className="ml-[6vw] mr-[4vw] mb-2">{posts.length} Posts</p>

            <FollowComponent
              followingList={followingList}
              userToFollow={userName}
              myName={myName}
            />

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

      
      <div className="w-[98vw] md:w-[50vw] mb-6">

        {loading && <PostSkeleton />}

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
        <div className="text-2xl text-center font-extrabold">
          No posts found!
        </div>
      )}
    </div>
  );
};

export default page;
