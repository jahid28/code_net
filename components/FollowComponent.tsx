import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FollowComponent = (props: any) => {
  const [followed, setFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (props.followingList.includes(props.userToFollow)) {
      setFollowed(true);
    }
  }, [props.followingList, props.userToFollow]);

  const myName = props.myName;
  const userToFollow = props.userToFollow;


  async function follow() {
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userToFollow,
          myName,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  async function unFollow() {
    try {
      const userToUnFollow = props.userName;
      const res = await fetch("/api/unFollow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userToUnFollow:userToFollow,
          myName,
        }),
      });
      const data = await res.json();
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
    <div>
      {!followed && myName != userToFollow && (
        <div
          onClick={() => {
            setFollowed(true);
            follow();
          }}
          className="cursor-pointer text-white text-sm ml-8 py-0.5 bg-red-500 hover:bg-red-600 px-2 rounded-md border-2 border-red-500"
        >
          Follow
        </div>
      )}

      {followed && myName != userToFollow && (
        <div
          onClick={() => {
            setFollowed(false);
            unFollow();
          }}
          className="cursor-pointer text-red-500 text-sm ml-8 py-0.5 px-2 rounded-md border-2 border-red-500"
        >
          UnFollow
        </div>
      )}
    </div>
  );
};

export default FollowComponent;
