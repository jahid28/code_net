import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FaRegCopy } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CommentBox from "./CommentBox";
import LikeComponent from "./LikeComponent";
import { Player } from "@lordicon/react";
import FollowComponent from "./FollowComponent";
import DeleteComponent from "./DeleteComponent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { languageMap } from "@/lib/interfaces";

const SinglePost = (props: any) => {
  const data = props.data;

  const playerRefShare = useRef<Player>(null);
  const share = require("@/icons/share.json");

  const dateInstance = new Date(data.date);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[dateInstance.getDay()];
  const day = String(dateInstance.getUTCDate()).padStart(2, "0");
  const month = String(dateInstance.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = dateInstance.getUTCFullYear();

  type LanguageKey = keyof typeof languageMap;
  const langObj: { lang: LanguageKey } = { lang: data.lang };

  return (
    <div>
      <div className="flex items-center mb-3">
        <Link className="flex items-center" href={`/account/${data.userName}`}>
          {/* <Image
            className="rounded-full"
            src={data.profilePic}
            width={40}
            height={40}
            alt="profile pic"
          /> */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={data.profilePic}
              alt="profile Pic"
              layout="fill"
              className="object-center"
            />
          </div>
          <p className="ml-2 rounded-md text-lg w-fit">{data.name}</p>
        </Link>

        <FollowComponent
          followingList={props.followingList}
          userToFollow={data.userName}
          myName={props.myName}
        />

        <p className="ml-auto">
          {dayOfWeek} {day}-{month}-{year}
        </p>
      </div>

      <p className="bg-dark-color rounded-md mb-2 px-1 w-fit">
        {data.codeType}
      </p>

      <p className="text-lg mb-2">{data.msg}</p>
      {data.code != " " && (
        <div className="p-2 bg-dark-color rounded-md ">
          <div className="flex">
            {/* <p className="px-1 bg-color rounded-md">Type : {data.codeType}</p> */}
            <p className="px-1 bg-color rounded-md ml-2 mb-2">{data.lang}</p>
            <p
              className="ml-auto cursor-pointer text-lg"
              onClick={() => {
                navigator.clipboard
                  .writeText(data.code)
                  .then(() => {
                    toast.success("Code Copied!");
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
              }}
            >
              <FaRegCopy />
            </p>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            <SyntaxHighlighter
              language={languageMap[langObj.lang]}
              style={darcula}
              showLineNumbers={true}
            >
              {data.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {data.imagesForMongoDB.length > 0 && (
        <div className="w-full grid place-items-center my-2">
          <Carousel className="w-3/5 sm:w-full max-w-xs">
            <CarouselContent>
              {data.imagesForMongoDB.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="p-1 w-full grid place-items-center">
                    <Image
                      key={index}
                      src={image}
                      alt="uploaded images"
                      width={500}
                      height={0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="text-red-500">
              <CarouselPrevious />
            </div>
            <div className="text-red-500">
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      )}
      <div className="flex bg-red-0 mt-2">
        <LikeComponent
          _id={data._id}
          likeArr={data.likedBy}
          likeNum={data.likedBy.length}
          userName={props.myName}
        />

        <CommentBox postId={data._id} comments={data.comments} />

        <div
          onMouseEnter={() => playerRefShare.current?.playFromBeginning()}
          onClick={() => {
            navigator.clipboard
              .writeText(`localhost:3000/post/${data._id}`)
              .then(() => {
                toast.success("Post link copied!");
              })
              .catch((err) => {
                toast.error(err);
              });
          }}
          className="ml-[10vw] md:ml-16 cursor-pointer"
        >
          <Player
            colorize={"var(--icon-color)"}
            ref={playerRefShare}
            size={30}
            icon={share}
          />
        </div>

        {props.myName == data.userName && <DeleteComponent _id={data._id} />}
      </div>
      <br />
      <hr />
      <br />
    </div>
  );
};

export default SinglePost;
