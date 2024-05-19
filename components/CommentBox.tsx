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
const commentSchema = z
  .string()
  .trim()
  .min(3, { message: "Comment must be atleast 3 characters long." })
  .max(200, { message: "Comment must be atmost 200 characters long." });

const CommentBox = (props: any) => {
  const playerRefComment = useRef<Player>(null);
  const commentIcon = require("@/icons/comment.json");
  const playerRefArrow = useRef<Player>(null);
  const arrow = require("@/icons/arrow.json");

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  async function submit() {
    try {
      setLoading(true);

      const result = commentSchema.safeParse(comment);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/postComment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postId: props.postId,
          comment: result.data,
        }),
      });
      const data = await res.json();
      setLoading(false);
      setComment("");
      if (data.success === false) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex cursor-pointer text-color text-xl"
          onMouseEnter={() => playerRefComment.current?.playFromBeginning()}
        >
          <Player
            colorize={document.body.className == "darkmode" ? "white" : "black"}
            ref={playerRefComment}
            size={30}
            icon={commentIcon}
          />
          <p className="ml-2">{props.comments.length}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <textarea
            value={comment}
            className="mt-4 inp-border w-full bg-color text-color rounded-md p-1"
            cols={60}
            rows={4}
            id="userTextinp"
            required
            autoComplete="off"
            placeholder="Post your comment here..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>

          <div
            onMouseEnter={() => playerRefArrow.current?.playFromBeginning()}
            onClick={() => {
              submit();
            }}
            className="flex bg-red-500 mt-2 hover:bg-red-600 align-middle text-white px-2 py-.05 rounded-xl cursor-pointer text-lg ml-auto"
          >
            <p className="mr-2 text-xl">Comment</p>

            <Player
              colorize="white"
              ref={playerRefArrow}
              size={32}
              icon={arrow}
            />
          </div>

          <p className="text-xl mr-auto">All Comments :</p>

          <div className="w-full grid place-items-center mb-4">
            {/* <div className="flex items-center"> */}
            {/* <DialogTitle> */}
            {/* </DialogTitle> */}

            <div className="h-[40vh] w-full overflow-y-auto border-0 border-gray-300">
              {props.comments.map((e: any) => {
                return (
                  <div className="w-full border-0 border-teal-400">
                    <Link className="flex w-fit" href={`/account/${e.user}`}>
                      <Image
                        className="rounded-full"
                        src={e.profilePic}
                        width={30}
                        height={30}
                        alt="profile pic"
                      />
                      <p className="ml-2 rounded-md w-fit">{e.name}</p>
                    </Link>
                    <p className="mt-2">{e.comment}</p>
                    <br />
                    <hr />
                    <br />
                  </div>
                );
              })}
            </div>

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
