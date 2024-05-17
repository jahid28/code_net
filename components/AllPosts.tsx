import { postInterface } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
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
import { Player } from "@lordicon/react";
import { BiLike, BiSolidLike, BiCommentDetail } from "react-icons/bi";
// import { ref } from "firebase/storage";
import { getCookie } from "cookies-next";
import { like } from "@/lib/likeFunc";
import { dislike } from "@/lib/dislikeFunc";
import CommentBox from "./CommentBox";

const AllPosts = () => {
  // const [user, setUser] = useState<string | undefined>("nope");
  // useEffect(() => {
  const user = getCookie("userName");
  // setUser(val);
  // }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const [likeArr, setLikeArr] = useState<number[]>([]);
  const [likeNumArr, setLikeNumArr] = useState<number[]>([]);
  const heartRefsArray = 
    Array(10)
      .fill(null)
      .map(() => useRef(null))

  // const commentRefsArray = 
  //   Array(10)
  //     .fill(null)
  //     .map(() => useRef(null))
  

  const heart = require("@/icons/heart.json");
  const solidHeart = require("@/icons/solidHeart.json");
  // const comment = require("@/icons/comment.json");

  // Function to add a new ref to the array
  // const addRef = () => {
  //   const newRef = useRef<HTMLDivElement>(null);
  //   setRefsArray([...refsArray, newRef]);
  // };

  interface getPostInterface extends postInterface {
    _id: string;
  }

  const [posts, setPosts] = useState<getPostInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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

      setLikeArr(Array(data.data.length).fill(0));
      setLikeNumArr(Array(data.data.length).fill(0));

      // const newRefs: React.RefObject<HTMLDivElement>[] = Array.from({ length: 4 }, () => useRef<HTMLDivElement>(null));
      // setRefsArray(newRefs);
      // setRefsArray(Array(data.data.length).fill(useRef<HTMLDivElement>(null)));

      data.data.map((e: any, index: any) => {
        e.likedBy.map((e: any) => {
          if (e == user) {
            setLikeArr((prevArray) => {
              const newArray = [...prevArray];
              newArray[index] = 1;
              return newArray;
            });
          }
        });

        setLikeNumArr((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = e.likedBy.length;
          return newArray;
        });
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="border-2 border-red-700 grid place-items-center text-color">
      <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      />
      {posts.map((e, index) => {
        const dateInstance = new Date(e.date);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[dateInstance.getDay()];
        const day = String(dateInstance.getUTCDate()).padStart(2, "0");
        const month = String(dateInstance.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const year = dateInstance.getUTCFullYear();

        // let liked = false;
        // e.likedBy.map((e) => {
        //   if (e === user) {
        //     liked = true;
        //   }
        // });

        return (
          <div
            className="border-2 border-green-600 w-[90vw] md:w-[50vw] mb-6"
            key={index}
          >
            <div className="flex mb-3">
              <Link className="flex " href={`/account/${e.userName}`}>
                <Image
                  className="rounded-full"
                  src={e.profilePic}
                  width={40}
                  height={40}
                  alt="profile pic"
                />
                <p className="ml-2 rounded-md text-lg w-fit">{e.name}</p>
              </Link>
              <p className="ml-auto">
                {dayOfWeek} {day}-{month}-{year}
              </p>
            </div>

            <p className="text-lg mb-2">{e.msg}</p>

            {e.code != " " && (
              <div className="p-2 bg-dark-color rounded-md">
                <div className="flex mb-2">
                  <p className="px-1 bg-color rounded-md">{e.codeType}</p>
                  <p className="px-1 bg-color rounded-md ml-2">{e.lang}</p>
                  <p
                    className="ml-auto cursor-pointer text-lg"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(e.code)
                        .then(() => {
                          toast.success("Copied!");
                        })
                        .catch((err) => {
                          toast.error(err);
                        });
                    }}
                  >
                    <FaRegCopy />
                  </p>
                </div>

                <p>{e.code}</p>
              </div>
            )}

            {e.imagesForMongoDB.length > 0 && (
              <div className="w-full border-2 border-yellow-300 grid place-items-center my-2">
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {e.imagesForMongoDB.map((image, index) => (
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

            <div className="flex bg-red-900">
              {!likeArr[index] ? (
                <div
                onMouseEnter={() => (heartRefsArray[index].current as any)?.playFromBeginning()}

                  onClick={() => {
                    setLikeArr((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = 1;
                      return newArray;
                    });
                    setLikeNumArr((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = newArray[index] + 1;
                      return newArray;
                    });
                    like(e._id);
                  }}
                  className="cursor-pointer flex align-middle text-xl mr-8"
                >
                  {/* <BiLike className="text-2xl mr-4" /> */}
                  <Player
                    colorize={
                      document.body.className == "darkmode" ? "white" : "black"
                    }
                    ref={heartRefsArray[index]}
                    size={30}
                    icon={heart}
                  />
                  <p className="ml-1">{likeNumArr[index]}</p>
                </div>
              ) : (
                <div
                onMouseEnter={() => (heartRefsArray[index].current as any)?.playFromBeginning()}

                  onClick={() => {
                    setLikeArr((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = 0;
                      return newArray;
                    });
                    setLikeNumArr((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = newArray[index] - 1;
                      return newArray;
                    });
                    dislike(e._id);
                  }}
                  className="cursor-pointer flex align-middle text-xl mr-8"
                >
                  {/* <BiSolidLike className="text-2xl mr-4" /> */}
                  <Player
                    colorize={"#ef4444"}
                    ref={heartRefsArray[index]}
                    size={30}
                    icon={solidHeart}
                  />
                  <p className="ml-1">{likeNumArr[index]}</p>
                </div>
              )}

              {/* <div
                              onMouseEnter={() => (commentRefsArray[index].current as any)?.playFromBeginning()}
                className="cursor-pointer flex align-middle text-xl"
              >
                 <Player
                      colorize={
                        document.body.className == "darkmode" ? "white" : "black"
                      }
                    ref={commentRefsArray[index]}
                    size={30}
                    icon={comment}
                  />
                <p className="ml-1">{e.comments.length}</p>
              </div> */}

              <CommentBox comments={e.comments}/>
              

            </div>

            <br />
            <hr />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default AllPosts;
