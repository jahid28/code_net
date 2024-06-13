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
import FollowComponent from "./FollowComponent";
import DeleteComponent from "./DeleteComponent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { languageMap } from "@/lib/interfaces";
import { postInterface } from "@/lib/interfaces";
import { useSelector } from "react-redux";
import { BsShareFill } from "react-icons/bs";

interface getPostInterface extends postInterface {
  _id: string;
}

interface propsInterface {
  data: getPostInterface;
}

const SinglePost: React.FC<propsInterface> = (props: propsInterface) => {
  const data: getPostInterface = props.data;
  const [myName, setMyName] = useState<string>("");
  const dateInstance: Date = new Date(data.date);


  const daysOfWeek: Array<string> = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const dayOfWeek: string = daysOfWeek[dateInstance.getDay()];

  let options = { timeZone: "Asia/Kolkata" };

  const day: string = dateInstance.toLocaleString("en-IN", {
    ...options,
    day: "2-digit",
  });
  const month: string = dateInstance.toLocaleString("en-IN", {
    ...options,
    month: "2-digit",
  });
  const year: string = dateInstance.toLocaleString("en-IN", {
    ...options,
    year: "numeric",
  });
  // const day: string = String(dateInstance.getUTCDate()).padStart(2, "0");
  // const month: string = String(dateInstance.getUTCMonth() + 1).padStart(2, "0");
  // const year: number = dateInstance.getUTCFullYear();

  const currentUserDetails = useSelector(
    (state: any) => state.reducer1.currentUserDetails
  );

  useEffect(() => {
    setMyName(currentUserDetails.userName);
  }, [currentUserDetails]);

  return (
    <div>
      <div className="flex items-center mb-3">
        <Link className="flex items-center" href={`/account/${data.userName}`}>
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
          userToFollow={data.userName}
          myName={myName}
        />

        <p className="ml-auto text-sm md:text-lg">
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
            <p className="px-1 bg-color rounded-md ml-2 mb-2">{data.lang}</p>
            <p
              className="ml-auto cursor-pointer text-lg iconHover"
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
              language={languageMap[data.lang]}
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
          <Carousel className="w-4/5 md:w-3/5">
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
            <div className="text-ascent">
              <CarouselPrevious />
            </div>
            <div className="text-ascent">
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
          userName={myName}
        />

        <CommentBox postId={data._id} comments={data.comments} />

        <div
          onClick={() => {
            navigator.clipboard
              .writeText(
                `${process.env.NEXT_PUBLIC_WEBSITE_URL}/post/${data._id}`
              )
              .then(() => {
                toast.success("Post link copied!");
              })
              .catch((err) => {
                toast.error(err);
              });
          }}
          className="ml-[10vw] mt-1 md:ml-16 cursor-pointer"
        >
          <p className="text-xl iconHover">
            <BsShareFill />
          </p>
        </div>

        {myName == data.userName && <DeleteComponent _id={data._id} />}
      </div>
      <br />
      <hr />
      <br />
    </div>
  );
};

export default SinglePost;
