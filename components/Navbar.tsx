"use client";
import React, { useEffect, useRef, useState } from "react";
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
import Link from "next/link";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { Player } from "@lordicon/react";
// useRef
const Navbar = () => {
  // defineElement(lottie.loadAnimation);

  const playerRefHome = useRef<Player>(null);
  const playerRefSearch = useRef<Player>(null);
  const playerRefNoti = useRef<Player>(null);
  const playerRefSearchPC = useRef<Player>(null);
  const playerRefNotiPC = useRef<Player>(null);
  const playerRefSetting = useRef<Player>(null);

  const home = require("@/icons/home.json");
  const search = require("@/icons/search.json");
  const noti = require("@/icons/noti.json");
  const setting = require("@/icons/setting.json");

  // useEffect(() => {
  //     playerRef.current?.playFromBeginning();
  // }, [])

  // const [mode, setMode] = useState<string>("darkmode");
  document.body.className = "darkmode";

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [profilePic, setprofilePic] = useState<string | undefined>("");
  // const [profilePic, setprofilePic] = useState<string | undefined>(undefined);

  // let res=NextResponse.next()
  useEffect(() => {
    // console.log("hahah")
    const pic = getCookie("profilePic");
    setprofilePic(pic);

    if (getCookie("email") != undefined) {
      setIsEmail(true);
    }
  }, []);

  console.log("now");

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

  // useEffect(() => {
  // document.body.className = mode;
  // }, [mode]);
  return (
    <div className="fixed top-0 w-[100vw] z-50">
      <nav className="bg-dark-color flex p-2 w-full ">
        <p className="text-color font-extrabold text-4xl">
          <Link href={"/"}>CodeNet</Link>
        </p>

        <div className="ml-auto hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="text-color inp-border flex h-9 w-96 rounded-md border  bg-transparent px-3 py-1 text-xs md:text-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400"
          />
          <div
            className="cursor-pointer ml-2"
            onMouseOver={() => playerRefSearchPC.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefSearchPC}
              size={40}
              icon={search}
            />
          </div>

          <div
            className="cursor-pointer ml-2"
            onMouseOver={() => playerRefNotiPC.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefNotiPC}
              size={40}
              icon={noti}
            />
          </div>
          {/* <IoSearchOutline className="text-4xl text-color ml-2 mt-.5 cursor-pointer" /> */}
          {/* <IoNotifications className="text-4xl text-color ml-10 mt-.5 cursor-pointer" /> */}
          {/* <IoSettingsSharp className="text-4xl text-color ml-10 mt-.5 cursor-pointer"/> */}
        </div>

        {isEmail ? (
          <Link className="ml-auto md:ml-4" href={"/account"}>
            <Image
              className="rounded-full  mr-4 cursor-pointer"
              src={`${profilePic}`}
              width={40}
              height={40}
              alt="profilePic"
            />
          </Link>
        ) : (
          <div className="text-red-500 ml-auto md:ml-4 cursor-pointer text-xl font-bold inp-border p-1 mr-4 hover:bg-color">
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </nav>


      {/* For mobile */}

      <div className="flex justify-between text-5xl p-2 w-full md:hidden text-color bg-color fixed bottom-0 z-20">
        
        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-2 border-red-500 border-2"
            onMouseOver={() => playerRefHome.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefHome}
              size={50}
              icon={home}
            />
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-2 border-red-500 border-2"
            onMouseOver={() => playerRefSearch.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefSearch}
              size={50}
              icon={search}
            />
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-2 border-red-500 border-2"
            onMouseOver={() => playerRefNoti.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefNoti}
              size={50}
              icon={noti}
            />
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-2 border-red-500 border-2"
            onMouseOver={() => playerRefSetting.current?.playFromBeginning()}
          >
            <Player
              colorize={
                document.body.className == "darkmode" ? "white" : "black"
              }
              ref={playerRefSetting}
              size={50}
              icon={setting}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
