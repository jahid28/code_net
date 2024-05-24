import React, { useRef } from "react";
import { Player } from "@lordicon/react";
// useRef
const Tags = () => {
  const playerRefTag = useRef<Player>(null);
  const tag = require("@/icons/tag.json");
  return (
    <div className="border-green-500 border-2">
      <div
        onMouseEnter={() => playerRefTag.current?.playFromBeginning()}
        className="text-3xl ml-2 flex w-fit text-color font-bold items-center"
      >
        <p className="mr-2">Tags</p>

        <Player
          colorize={"var(--icon-color)"}
          ref={playerRefTag}
          size={30}
          icon={tag}
        />
      </div>
    </div>
  );
};

export default Tags;
