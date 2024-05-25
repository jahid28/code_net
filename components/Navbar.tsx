// "use client";
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
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { Player } from "@lordicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FiSun, FiMoon } from "react-icons/fi";
import { set } from "mongoose";
import { toast } from "sonner";
// useRef
const Navbar = () => {
  // defineElement(lottie.loadAnimation);
  const router = useRouter();
  const [size, setSize] = useState(50); // Default size is 50
  const [query, setQuery] = useState("");


  const playerRefHome = useRef<Player>(null);
  const playerRefSearch = useRef<Player>(null);
  const playerRefNoti = useRef<Player>(null);
  const playerRefSearchPC = useRef<Player>(null);
  const playerRefNotiPC = useRef<Player>(null);
  const playerRefSetting = useRef<Player>(null);
  const playerRefCode = useRef<Player>(null);

  const home = require("@/icons/home.json");
  const search = require("@/icons/search.json");
  const noti = require("@/icons/noti.json");
  const setting = require("@/icons/setting.json");
  const code = require("@/icons/code.json");

  // document.body.className = "darkmode";

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [profilePic, setprofilePic] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string>("");
  const [mode, setMode] = useState<string>("darkmode");
  const [isNoti, setIsNoti] = useState<boolean>(false);

  useEffect(() => {
    document.body.className = "darkmode";
    // const pic = getCookie("profilePic");
    // setprofilePic(pic);
    // if (pic == undefined) {
    //   setprofilePic(process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PIC);
    // }
    // const userNameExist = getCookie("userName");
    // if (userNameExist != undefined) {
    //   setIsEmail(true);
    //   setUserName(userNameExist);
    // }
    
    async function checkNoti() {
      try {
        const res = await fetch("/api/checkNotiAndGetDetails", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
        },
        // body: JSON.stringify(result),
      });
      const data = await res.json();
      if (data.success) {
        console.log("data is from noti", data);
        setIsNoti(data.noti);
        setprofilePic(data.profilePic);
        setIsEmail(true);
        setUserName(data.userName);
      }
    } catch (error) {
      
      toast.error("Something went wrong in fetching noti")
     }

    }

    checkNoti();

    // const isBelowMd = window.innerWidth <= 768; // Check if screen is below "md"
    //   setSize(isBelowMd ? 20 : 50);

      return
  }, []);

  function logout() {
    const res = confirm("Are you sure you want to logout?");
    if (res) {
      signOut();
      deleteCookie("userName");
      deleteCookie("name");
      deleteCookie("profilePic");
    }
  }

  function pushQuery() {
    let finalQuery = query.trim();
    if(finalQuery == "") {
      return
    }
    
    finalQuery = finalQuery.replace(/\s+/g, ' ');
    
    finalQuery = finalQuery.replace(/ /g, '+');

    router.push(`/searchPage?query=${finalQuery}`);
  }

  return (
    <div className="sticky text-color top-0 w-[100vw] z-50 mb-4">
      <nav className="bg-dark-color flex p-2 w-full ">
        <Link
          onMouseEnter={() => playerRefCode.current?.playFromBeginning()}
          className="font-extrabold text-4xl flex items-center"
          href={"/"}
        >
          <p className="mr-2">CodeNet</p>

          <Player
            colorize={"var(--icon-color)"}
            ref={playerRefCode}
            size={50}
            icon={code}
          />
        </Link>

        <div className="ml-auto hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            className="inp-border flex h-9 w-96 rounded-md border  bg-transparent px-3 py-1 text-xs md:text-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400"
          />
          <div
            className="cursor-pointer ml-2"
            onClick={pushQuery}
            onMouseEnter={() => playerRefSearchPC.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefSearchPC}
              size={40}
              icon={search}
            />
          </div>

          <Link 
          href={"/notifications"}
          onClick={() => setIsNoti(false)}
            className="cursor-pointer ml-2 flex"

            onMouseEnter={() => playerRefNotiPC.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefNotiPC}
              size={40}
              icon={noti}
            />
            {
              isNoti && <p className="w-3 h-3 rounded-full bg-red-500"></p>
            }
          </Link>
        </div>

        <div className="ml-auto md:ml-0 flex">
          {mode == "lightmode" ? (
            <div
              onClick={() => {
                document.body.className = "darkmode";
                setMode("darkmode");
              }}
              className="text-3xl ml-2 cursor-pointer mt-1"
            >
              <FiMoon />
            </div>
          ) : (
            <div
              onClick={() => {
                document.body.className = "lightmode";
                setMode("lightmode");
              }}
              className="text-3xl ml-2 cursor-pointer mt-1"
            >
              <FiSun />
            </div>
          )}

          {isEmail ? (
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    className="rounded-full  mr-4 cursor-pointer"
                    src={`${profilePic}`}
                    width={40}
                    height={40}
                    alt="profilePic"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  <Link
                    href={`/account/${userName}`}
                    className="cursor-pointer"
                  >
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <p
                    onClick={() => {
                      logout();
                    }}
                  >
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </p>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="text-red-500 ml-auto md:ml-4 cursor-pointer text-xl font-bold inp-border p-1 mr-4 hover:bg-color">
              <Link href={"/login"}>Login</Link>
            </div>
          )}
        </div>
      </nav>

      {/* For mobile */}

      <div className="flex justify-between text-5xl p-2 w-full md:hidden bg-color fixed bottom-0 z-20">
        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-[4vw] border-green-500 border-2"
            onMouseEnter={() => playerRefHome.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefHome}
              size={35}
              icon={home}
            />
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-[4vw] border-yellow-500 border-2"
            onMouseEnter={() => playerRefSearch.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefSearch}
              size={35}
              icon={search}
            />
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-[4vw] border-blue-500 border-2 flex"
            onMouseEnter={() => playerRefNoti.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefNoti}
              size={35}
              icon={noti}
            />
             {
              isNoti && <p className="w-2 h-2 rounded-full bg-red-500"></p>
            }
          </div>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
            className="cursor-pointer ml-[4vw] border-gray-500 border-2"
            onMouseEnter={() => playerRefSetting.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefSetting}
              size={35}
              icon={setting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
