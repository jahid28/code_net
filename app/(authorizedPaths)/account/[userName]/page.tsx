"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { postInterface } from "@/lib/interfaces";
import SinglePost from "@/components/SinglePost";
import PostSkeleton from "@/components/PostSkeleton";
import Image from "next/image";
import FollowComponent from "@/components/FollowComponent";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { googleUserInterface } from "@/lib/interfaces";

import { BsShareFill } from "react-icons/bs";

interface userDetailInterface extends googleUserInterface {
  password?: string;
}

interface PageProps {
  params: { userName: string };
}

const AccountPage: React.FC<PageProps> = ({ params }) => {
  interface getPostInterface extends postInterface {
    _id: string;
  }

 
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [myName, setMyname] = useState<string>("");
  const [userDetails, setUserDetails] = useState<userDetailInterface>({
    name: "",
    userName: "",
    email: "",
    profilePic: "",
    followers: [],
    following: [],
  });
  const userName: string = params.userName;

  async function getUserPosts(): Promise<void> {
    try {
      setLoading(true);
      const response: Response = await fetch("/api/getUserPosts", {
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
      // posts.reverse();
      setPosts((data.data).reverse());
      setMyname(data.myName);
      setUserDetails(data.userDetails);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching user posts");
      setLoading(false);
    }
  }

  useEffect((): void => {
    getUserPosts();
  }, []);

  const isEmpty = (obj: userDetailInterface): boolean => {
    return (
      obj.name === "" ||
      obj.userName === "" ||
      obj.email === "" ||
      obj.profilePic === ""
    );
  };

  return (
    <div className="grid place-items-center">
      {!loading && isEmpty(userDetails) && (
        <div className="grid place-items-center ">
          <Image
            className="mb-4"
            src="/empty.png"
            width={300}
            height={300}
            alt="404"
          />
          <p className="text-2xl font-bold">NO USER FOUND</p>
        </div>
      )}

      {loading && <ProfileSkeleton />}

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

          <div>
            <p className="text-2xl font-bold">{userDetails.name}</p>
            <div className="text-xl opacity-50 flex">
              <p>@{userDetails.userName}</p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-wrap text-lg lg:text-2xl mt-2 lg:mt-0 font-bold">
            <p className="ml-[6vw] mb-2">
              Followers : {userDetails.followers.length}
            </p>
            <p className="ml-[6vw] mb-2">
              Following : {userDetails.following.length}
            </p>
            <p className="ml-[6vw] mr-[4vw] mb-2">{posts.length} Posts</p>

            <FollowComponent
              userToFollow={userName}
              myName={myName}
            />

            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/account/${userName}`
                  )
                  .then(() => {
                    toast.success("Profile link copied!");
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
              }}
              className="ml-[6vw] cursor-pointer mb-2"
            >
              
              <p className="text-xl iconHover">
                <BsShareFill />
              </p>
            </div>
          </div>
        </div>
      )}
      

      <div className="w-[90vw] md:w-[50vw] mb-6">
        {loading && <PostSkeleton />}

        {!loading &&
          posts.length > 0 &&
          !isEmpty(userDetails) &&
          posts.map((e, index) => {
            return <SinglePost key={index} data={e} />;
          })}
      </div>

      {!loading && posts.length == 0 && !isEmpty(userDetails) && (
        <div className="grid place-items-center ">
          <Image
            className="mb-4"
            src="/empty.png"
            width={300}
            height={300}
            alt="404"
          />
          <p className="text-2xl text-center font-bold">No posts found!</p>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
