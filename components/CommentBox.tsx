"use client";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Player } from "@lordicon/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";
import Link from "next/link";
// const postSchema = z.object({
//   codeType: z.string().trim(),
//   msg: z
//     .string()
//     .trim()
//     .min(3, { message: "Message must be atleast 3 characters long." }),
//   code: z.string().trim(),
//   lang: z.string().trim(),
// });

const CommentBox = (props: any) => {
  const playerRefComment = useRef<Player>(null);
  const comment = require("@/icons/comment.json");

  const [loading, setLoading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex cursor-pointer text-color text-xl"
          onMouseEnter={() => playerRefComment.current?.playFromBeginning()}
        >
          <Player
            colorize="white"
            ref={playerRefComment}
            size={30}
            icon={comment}
          />
          <p className="ml-2">{props.comments.length}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="w-full grid place-items-center mb-4">
            {/* <div className="flex items-center"> */}
            <DialogTitle>
              <p className="text-2xl">Comments</p>
            </DialogTitle>

            {props.comments.map((e: any) => {
              return (
                <div className="w-full border-2 border-teal-400">
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
                  <p className="mt-2">{e.comment}</p>
<br />
                  <hr />
<br />
                </div>
              );
            })}

            <ClipLoader
              className="absolute top-40%"
              color="#e94154"
              loading={loading}
              size={100}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CommentBox;
