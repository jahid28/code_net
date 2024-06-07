// "use client";
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
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCurrentUserDetailsActionFunc } from "@/redux/actions";
import home from "@/icons/home.json";
import search from "@/icons/search.json";
import noti from "@/icons/noti.json";
import profile from "@/icons/profile.json";
import code from "@/icons/code.json";

const Navbar: React.FC = () => {
  const playerRefHome = useRef<Player>(null);
  const playerRefSearch = useRef<Player>(null);
  const playerRefNoti = useRef<Player>(null);
  const playerRefNotiPC = useRef<Player>(null);
  const playerRefProfile = useRef<Player>(null);
  const playerRefCode = useRef<Player>(null);

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [profilePic, setprofilePic] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string>("");
  const [mode, setMode] = useState<string>("darkmode");
  const [isNoti, setIsNoti] = useState<boolean>(false);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  const dispatch = useDispatch();
  const currentUserDetails = useSelector(
    (state: any) => state.reducer1.currentUserDetails
  );

  useEffect(() => {
    console.log("currentUserDetails from nav", currentUserDetails);

    if (currentUserDetails.name === "") {
      dispatch(getCurrentUserDetailsActionFunc());
      console.log("currentUserDetails from nav after", currentUserDetails);
    } else {
      setIsNoti(currentUserDetails.noti);
      setIsEmail(true);
      setprofilePic(currentUserDetails.profilePic);
      setUserName(currentUserDetails.userName);
    }
  }, [currentUserDetails]);

  // async function checkNoti():Promise<void> {
  //   try {
  //     const res:Response = await fetch("/api/checkNotiAndGetDetails", {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       // body: JSON.stringify(result),
  //     });
  //     const data = await res.json();
  //     if (data.success) {
  //       setIsNoti(data.noti);
  //       setprofilePic(data.profilePic);
  //       setIsEmail(true);
  //       setUserName(data.userName);
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong in fetching noti");
  //   }
  // }

  useEffect((): void => {
    document.body.className = "darkmode";
    // checkNoti();
    return;
  }, []);

  function logout(): void {
    const res: boolean = confirm("Are you sure you want to logout?");
    if (res) {
      signOut();
      deleteCookie("token");
      // deleteCookie("name");
      // deleteCookie("profilePic");
    }
  }

  return (
    <div className="sticky text-color top-0 w-[100vw] z-50  mb-4">
      <nav className="bg-dark-color flex p-2 w-full items-center">
        <Link
          onMouseEnter={() => playerRefCode.current?.playFromBeginning()}
          className="flex items-center"
          href={"/"}
        >
          <h2 className="mr-2 font-extrabold text-4xl">CodeNet</h2>

          <Player
            colorize={"var(--p-color)"}
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
              colorize={"var(--p-color)"}
              ref={playerRefNotiPC}
              size={40}
              icon={noti}
            />
            {isNoti && <p className="w-3 h-3 rounded-full bg-ascent"></p>}
          </Link>
        </div>

        <div className="ml-auto md:ml-0 flex items-center">
          {mode == "lightmode" ? (
            <div
              onClick={(): void => {
                document.body.className = "darkmode";
                setMode("darkmode");
              }}
              className="text-3xl ml-2 cursor-pointer"
            >
              <FiSun />
            </div>
          ) : (
            <div
              onClick={(): void => {
                document.body.className = "lightmode";
                setMode("lightmode");
              }}
              className="text-3xl ml-2 cursor-pointer"
            >
              <FiMoon />
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
                  <div
                    onClick={() => {
                      logout();
                    }}
                  >
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </div>
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

      {searchToggle && (
        <div className="block w-[100vw] bg-dark-color py-2 md:hidden">
          <SearchBar />
        </div>
      )}

      {/* For mobile */}

      {isEmail && (
        <div className="flex bg-dark-color justify-between text-5xl p-2 w-full md:hidden bg-color fixed bottom-0 z-20 mt-20">
          <div className="w-1/4 grid place-items-center">
            <Link
              href={"/"}
              className="cursor-pointer ml-[4vw]"
              onMouseEnter={() => playerRefHome.current?.playFromBeginning()}
            >
              <Player
                colorize={"var(--p-color)"}
                ref={playerRefHome}
                size={35}
                icon={home}
              />
            </Link>
          </div>

          <div className="w-1/4 grid place-items-center">
            <div
              onClick={() => setSearchToggle(!searchToggle)}
              className="cursor-pointer ml-[4vw]"
              onMouseEnter={() => playerRefSearch.current?.playFromBeginning()}
            >
              <Player
                colorize={"var(--p-color)"}
                ref={playerRefSearch}
                size={35}
                icon={search}
              />
            </div>
          </div>

          <div className="w-1/4 grid place-items-center">
            <Link
              href={"/notifications"}
              onClick={() => setIsNoti(false)}
              className="cursor-pointer ml-[4vw] flex"
              onMouseEnter={() => playerRefNoti.current?.playFromBeginning()}
            >
              <Player
                colorize={"var(--p-color)"}
                ref={playerRefNoti}
                size={35}
                icon={noti}
              />
              {isNoti && <p className="w-2 h-2 rounded-full bg-ascent"></p>}
            </Link>
          </div>

          <div className="w-1/4 grid place-items-center">
            <Link
              href={`/account/${userName}`}
              className="cursor-pointer ml-[4vw]"
              onMouseEnter={() => playerRefProfile.current?.playFromBeginning()}
            >
              <Player
                colorize={"var(--p-color)"}
                ref={playerRefProfile}
                size={35}
                icon={profile}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
