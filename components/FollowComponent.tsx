import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { popFollowingToArrFunc, pushFollowingToArrFunc } from "@/redux/actions";
// useSelector
interface propsInterface {
  // followingList: string[];
  userToFollow: string;
  myName: string;

}

const FollowComponent:React.FC<propsInterface> = (props: propsInterface) => {
  const [followed, setFollowed] = useState<boolean>(false);
  // const [followingList, setFollowingList] = useState<string[]>([]);

  const dispatch = useDispatch();

  const currentUserDetails = useSelector(
    (state: any) => state.reducer1.currentUserDetails
  );

  // useEffect(() => {
    // setMyName(currentUserDetails.userName);
    // setFollowingList(currentUserDetails.following);
  // }, [currentUserDetails]);


  useEffect(() => {
    console.log("currentUserDetails from follow", currentUserDetails.following)
    if (currentUserDetails.following.includes(props.userToFollow)) {
      setFollowed(true);
    }
    else {
      setFollowed(false);
    }
  }, [currentUserDetails.following]);

  const myName:string = props.myName;
  const userToFollow:string = props.userToFollow;


  async function follow():Promise<void> {
    try {
      const res:Response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userToFollow,
          myName,
        }),
      });
      const data:{success:boolean,msg:string} = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
      } else {
        dispatch(pushFollowingToArrFunc(userToFollow));
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(String(error));
    }
  }

  async function unFollow():Promise<void> {
    try {
      const res:Response = await fetch("/api/unFollow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userToUnFollow:userToFollow,
          myName,
        }),
      });
      const data:{success:boolean,msg:string} = await res.json();
      if (data.success === false) {
        toast.error(data.msg);
      } else {
        dispatch(popFollowingToArrFunc(userToFollow));

        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(String(error));
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
          className="cursor-pointer text-white text-sm ml-8 py-0.5 bg-ascent px-2 rounded-md"
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
