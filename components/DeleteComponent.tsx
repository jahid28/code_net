import React, { useEffect, useState } from "react";
import { Player } from "@lordicon/react";
import { useRef } from "react";
import { toast } from "sonner";

const LikeComponent = (props: any) => {
  const playerRefTrash = useRef<Player>(null);
  const trash = require("@/icons/trash.json");

  async function deletePost(_id: string) {
    try {
      const confirmDel = confirm("Are you sure you want to delete this post?");
      if (!confirmDel) {
        return;
      }
      const res = await fetch("/api/deletePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data = await res.json();
      if (data.success == false) {
        toast.error(data.msg);
        return;
      }
      toast.success(data.msg);
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting post");
    }
  }
  return (
    <div className="ml-[10vw] md:ml-16 w-fit">
      <div
        onMouseEnter={() => playerRefTrash.current?.playFromBeginning()}
        onClick={() => {
          deletePost(props._id);
        }}
        className="cursor-pointer flex align-middle text-xl"
      >
        <Player
          colorize={"#e94154"}
          ref={playerRefTrash}
          size={30}
          icon={trash}
        />
      </div>
    </div>
  );
};

export default LikeComponent;
