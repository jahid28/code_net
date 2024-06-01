"use client";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
import { FiSun, FiMoon } from "react-icons/fi";
import { toast } from "sonner";
import SearchBar from "./SearchBar";
const Navbar = () => {
  const playerRefHome = useRef<Player>(null);
  const playerRefSearch = useRef<Player>(null);
  const playerRefNoti = useRef<Player>(null);
  const playerRefNotiPC = useRef<Player>(null);
  const playerRefProfile = useRef<Player>(null);
  const playerRefCode = useRef<Player>(null);

  const home = require("@/icons/home.json");
  const search = require("@/icons/search.json");
  const noti = require("@/icons/noti.json");
  const profile = require("@/icons/profile.json");
  const code = require("@/icons/code.json");

  // document.body.className = "darkmode";

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [profilePic, setprofilePic] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string>("");
  const [mode, setMode] = useState<string>("darkmode");
  const [isNoti, setIsNoti] = useState<boolean>(false);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  useEffect(() => {
    document.body.className = "darkmode";

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
          setIsNoti(data.noti);
          setprofilePic(data.profilePic);
          setIsEmail(true);
          setUserName(data.userName);
        }
      } catch (error) {
        toast.error("Something went wrong in fetching noti");
      }
    }

    checkNoti();
    return;
  }, []);

  function logout() {
    const res = confirm("Are you sure you want to logout?");
    if (res) {
      signOut();
      deleteCookie("token");
      // deleteCookie("name");
      // deleteCookie("profilePic");
    }
  }

  return (
    <div className="sticky text-color top-0 w-[100vw] z-50 mb-4">
      <nav className="bg-dark-color flex p-2 w-full items-center">
        <Link
          onMouseEnter={() => playerRefCode.current?.playFromBeginning()}
          className="flex items-center"
          href={"/"}
        >
          <h2 className="mr-2 font-extrabold text-4xl">CodeNet</h2>

          <Player
            colorize={"var(--icon-color)"}
            ref={playerRefCode}
            size={50}
            icon={code}
          />
        </Link>

        <div className="ml-auto hidden md:flex items-center">
          <SearchBar />

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
            {isNoti && <p className="w-3 h-3 rounded-full bg-red-500"></p>}
          </Link>
        </div>

        <div className="ml-auto md:ml-0 flex items-center">
          {mode == "lightmode" ? (
            <div
              onClick={() => {
                document.body.className = "darkmode";
                setMode("darkmode");
              }}
              className="text-3xl ml-2 cursor-pointer"
            >
              <FiMoon />
            </div>
          ) : (
            <div
              onClick={() => {
                document.body.className = "lightmode";
                setMode("lightmode");
              }}
              className="text-3xl ml-2 cursor-pointer"
            >
              <FiSun />
            </div>
          )}

          {isEmail ? (
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {/* <Image
                    className="rounded-full border-red-500 border-2 mr-4 cursor-pointer object-cover"
                    alt="profilePic"
                  /> */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4 cursor-pointer">
                    <Image
                      src={`${profilePic}`}
                      alt="profile Pic"
                      layout="fill"
                      // width={100}
                      // height={100}
                      // layout="fill"
                      // className="rounded-full object-cover"
                      className="object-center"
                    />
                  </div>
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
            <Link
              className="text-red-500 ml-4 cursor-pointer text-xl font-bold border-red-500 border-2 rounded-md p-1 mr-4 hover:bg-color"
              href={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

     {
       searchToggle && 
     <div className="block w-[100vw] bg-dark-color py-2 md:hidden">
        <SearchBar/>
     </div>
      }

      {/* For mobile */}

      <div className="flex justify-between text-5xl p-2 w-full md:hidden bg-color fixed bottom-0 z-20">
        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <Link
            href={"/"}
            className="cursor-pointer ml-[4vw] border-green-500 border-2"
            onMouseEnter={() => playerRefHome.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefHome}
              size={35}
              icon={home}
            />
          </Link>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <div
          onClick={() => setSearchToggle(!searchToggle)}
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
          <Link
            href={"/notifications"}
            onClick={() => setIsNoti(false)}
            className="cursor-pointer ml-[4vw] border-blue-500 border-2 flex"
            onMouseEnter={() => playerRefNoti.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefNoti}
              size={35}
              icon={noti}
            />
            {isNoti && <p className="w-2 h-2 rounded-full bg-red-500"></p>}
          </Link>
        </div>

        <div className="w-1/4 grid place-items-center border-red-500 border-2">
          <Link
            href={`/account/${userName}`}
            className="cursor-pointer ml-[4vw] border-gray-500 border-2"
            onMouseEnter={() => playerRefProfile.current?.playFromBeginning()}
          >
            <Player
              colorize={"var(--icon-color)"}
              ref={playerRefProfile}
              size={35}
              icon={profile}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
