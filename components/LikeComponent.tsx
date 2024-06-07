import React, { useEffect, useState } from "react";
import { Player } from "@lordicon/react";
import { useRef } from "react";
import { like } from "@/lib/likeFunc";
import { dislike } from "@/lib/dislikeFunc";
import heart from "@/icons/heart.json";
import solidHeart from "@/icons/solidHeart.json";

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
  const playerRefHeart = useRef<Player>(null);
  const playerRefSolidHeart = useRef<Player>(null);
  return (
    <div>
      {!liked ? (
        <div
          onMouseEnter={() => playerRefHeart.current?.playFromBeginning()}
          onClick={() => {
            setLiked(true);
            setLikeNum((prev) => prev + 1);
            like(props._id);
          }}
          className="cursor-pointer flex align-middle text-xl mr-[10vw] md:mr-16"
        >
          <Player
            colorize={"var(--p-color)"}
            ref={playerRefHeart}
            size={30}
            icon={heart}
          />
          <p className="ml-1">{likeNum}</p>
        </div>
      ) : (
        <div
          onMouseEnter={() => playerRefSolidHeart.current?.playFromBeginning()}
          onClick={() => {
            setLiked(false);
            setLikeNum((prev) => prev - 1);
            dislike(props._id);
          }}
          className="cursor-pointer flex align-middle text-xl mr-16"
        >
          <Player
            colorize={"#ef4444"}
            ref={playerRefSolidHeart}
            size={30}
            icon={solidHeart}
          />
          <p className="ml-1">{likeNum}</p>
        </div>
      )}
    </div>
  );
};

export default LikeComponent;
