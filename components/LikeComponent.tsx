import React, { useEffect, useState } from "react";
import { like } from "@/lib/likeFunc";
import { dislike } from "@/lib/dislikeFunc";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface propsInterface {
  likeNum: number;
  likeArr: string[];
  _id: string;
  userName: string;
}

const LikeComponent: React.FC<propsInterface> = (props: propsInterface) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(props.likeNum);
  useEffect((): void => {
    if (props.likeArr.includes(props.userName)) {
      setLiked(true);
    }
  }, [props.likeArr, props.userName]);
  return (
    <div>
      {!liked ? (
        <div
          onClick={() => {
            setLiked(true);
            setLikeNum((prev) => prev + 1);
            like(props._id);
          }}
          className="cursor-pointer flex items-center align-middle text-xl mr-[10vw] md:mr-16"
        >
          <p className="text-2xl iconHover">
            <BsHeart />
          </p>
          <p className="ml-1">{likeNum}</p>
        </div>
      ) : (
        <div
          onClick={() => {
            setLiked(false);
            setLikeNum((prev) => prev - 1);
            dislike(props._id);
          }}
          className="cursor-pointer flex items-center align-middle text-xl mr-16"
        >
          <p className="text-2xl iconHover text-red-500">
            <BsHeartFill />
          </p>
          <p className="ml-1">{likeNum}</p>
        </div>
      )}
    </div>
  );
};

export default LikeComponent;
