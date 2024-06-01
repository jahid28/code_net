// "use client";
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
import Link from "next/link";
import { commentSchema } from "@/lib/zodSchemas";

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
          className="flex cursor-pointer text-xl"
          onMouseEnter={() => playerRefComment.current?.playFromBeginning()}
        >
          <Player
            colorize={"var(--icon-color)"}
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
            className="mt-4 inp-border w-full bg-color rounded-md p-1"
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

          <div className="w-full grid place-items-center absolute top-40%">
            <ClipLoader color="#e94154" loading={loading} size={100} />
          </div>

          {!loading && props.comments.length > 0 && (
            <div>
              <p className="text-xl mr-auto mb-6">All Comments :</p>

              <div className="w-full grid place-items-center mb-4">
                <div className="max-h-[50vh] w-full overflow-y-auto">
                  {props.comments.map((e: any) => {
                    return (
                      <div className="w-full">
                        <Link
                          className="flex w-fit"
                          href={`/account/${e.user}`}
                        >
                          {/* <Image
                            className="rounded-full"
                            src={e.profilePic}
                            width={30}
                            height={30}
                            alt="profile pic"
                          /> */}
                          <div className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                            <Image
                              src={e.profilePic}
                              alt="profile Pic"
                              layout="fill"
                              // width={100}
                              // height={100}
                              // layout="fill"
                              // className="rounded-full object-cover"
                              className="object-center"
                            />
                          </div>
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
              </div>
            </div>
          )}

          {!loading && props.comments.length == 0 && (
            <div className="grid place-items-center ">
            <Image
              className="mt-10 mb-4"
              src="/empty.png"
              width={150}
              height={150}
              alt="404"
            />
            <p className="text-2xl font-bold">No Comments yet!</p>
          </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CommentBox;
