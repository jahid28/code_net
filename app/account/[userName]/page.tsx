"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const page = ({params}:{params:any}) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  // useEffect(() => {
  //   let name = getCookie("userName");
  //   if (name == undefined) {
  //     router.replace("/login");
  //     return;
  //   }
  //   setUserName(name!);
  // }, []);

  function logout() {
    // signOut()
    deleteCookie("userName");
    deleteCookie("profilePic");
    // deleteCookie("next-auth.session-token")
    // setCookie("next-auth.callback-url","http%3A%2F%2Flocalhost%3A3000%2Faccount")
    // setTimeout(() => {
    router.replace("/login");
    // }, 2000);
  }
  return (
    <div>
      {/* <Link onClick={()=>{}} href={"login"}> */}
      {/* <button
        onClick={() => {
            signOut();
            logout();
        }}
        className="w-full mt-20 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
        >
        Logout
      </button> */}
          <p className="mt-20">Hi {params.userName}</p>
      {/* </Link> */}
    </div>
  );
};

export default page;
