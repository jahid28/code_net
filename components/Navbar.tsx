"use client";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import { Input } from "@/components/ui/input";
import {
  IoSearchOutline,
  IoNotifications,
  IoSettingsSharp,
} from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [mode, setMode] = useState<string>("darkmode");
  const [profilePic, setprofilePic] = useState<string | undefined>("https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");
  // const [profilePic, setprofilePic] = useState<string | undefined>(undefined);

  // let res=NextResponse.next()
  useEffect(()=>{
    console.log("hahah")
    const pic = getCookie("profilePic");
    setprofilePic(pic)

  },[])
  
  // if(profilePic==undefined){
  //   // console.log("und")
  //   profilePic='https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
  // }
  
  // setInterval(()=>{
  //   console.log("pis is ",profilePic)
  // },200)
 
  // setprofilePic(pp)
  // useEffect(()=>{

  //   if (profilePic != undefined) {
  //     setIsProfilePic(false);
  //     clg
  //   }
  // },[])
  // console.log("gg ", profilePic);
  //   const inter = Roboto({ subsets: ["latin"], weight: ["100", "300", "700"] });
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);
  return (
    <>
      <nav className="bg-dark-color flex p-2">
        <p className="text-color font-extrabold text-4xl">CodeNet</p>

        {/* <button
          onClick={() => {
            signOut();
          }}
          className="text-white text bg_dark mb-5 mt-10 flex text-center  bg-gray-600 border-0 py-2 px-6 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          LogOut
        </button> */}

        {/* <div onClick={()=>{setToggle(true)}} className="text-color text-3xl ml-auto mr-2">
<RxHamburgerMenu/>
</div> */}

        <div className="ml-auto hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="text-color inp-border flex h-9 w-96 rounded-md border  bg-transparent px-3 py-1 text-xs md:text-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400"
          />
          {/* <div className="text-2xl md:text-3xl text-color ml-2 mt-1"> */}
          <IoSearchOutline className="text-4xl text-color ml-2 mt-.5 cursor-pointer" />
          {/* </div> */}

          <IoNotifications className="text-4xl text-color ml-10 mt-.5 cursor-pointer" />
          {/* <IoSettingsSharp className="text-4xl text-color ml-10 mt-.5 cursor-pointer"/> */}
        </div>

        {
          // profilePic==undefined ?
          // (
          //   <p className="text ml-2 text-3xl mt-1">
          //   <CgProfile />
          // </p>

          // ):
          // (
           
         <Image
           className="rounded-full ml-auto md:ml-8 mr-4 cursor-pointer"
           src={`${profilePic}`}
           width={40}
           height={40}
           alt="profilePic"
         />
          // )
        }
      </nav>

      <div className="flex justify-between text-5xl p-2 w-full md:hidden text-color bg-color fixed bottom-0">
        <GoHomeFill className="w-1/4 text-center" />
        <IoSearchOutline className="w-1/4 text-center" />
        <IoNotifications className="w-1/4 text-center" />
        <IoSettingsSharp className="w-1/4 text-center" />
      </div>
    </>
  );
};

export default Navbar;
