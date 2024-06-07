import React, { useEffect, useState } from "react";
import { Player } from "@lordicon/react";
import { useRef } from "react";
import { toast } from "sonner";
import trash from "@/icons/trash.json";

const LikeComponent:React.FC<{_id:string}> = (props: {_id:string}) => {
  const playerRefTrash = useRef<Player>(null);

  async function deletePost(_id: string):Promise<void> {
    try {
      const confirmDel:boolean = confirm("Are you sure you want to delete this post?");
      if (!confirmDel) {
        return;
      }
      const res:Response = await fetch("/api/deletePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data:{success:boolean,msg:string} = await res.json();
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
          colorize={"var(--ascent-color)"}
          ref={playerRefTrash}
          size={30}
          icon={trash}
        />
      </div>
    </div>
  );
};

export default LikeComponent;
