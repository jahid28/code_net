// "use client";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCurrentUserDetailsActionFunc } from "@/redux/actions";

import { BsSearch,BsBell,BsHouse,BsPerson,BsMoon,BsSun,BsCodeSlash } from "react-icons/bs";

const Navbar: React.FC = () => {

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

    if (currentUserDetails.name === "") {
      dispatch(getCurrentUserDetailsActionFunc());
    } else {
      setIsNoti(currentUserDetails.noti);
      setIsEmail(true);
      setprofilePic(currentUserDetails.profilePic);
      setUserName(currentUserDetails.userName);
    }
  }, [currentUserDetails]);


  useEffect((): void => {
    document.body.className = "darkmode";
    return;
  }, []);

  function logout(): void {
    const res: boolean = confirm("Are you sure you want to logout?");
    if (res) {
      signOut();
      deleteCookie("token");
    }
  }

  return (
    <div className="sticky text-color top-0 w-[100vw] z-50  mb-4">
      <nav className="bg-dark-color flex p-2 w-full items-center">
        <Link
          className="flex items-center"
          href={"/"}
        >
          <h2 className="mr-2 font-extrabold text-2xl md:text-4xl ">CodeNet</h2>

          <p className="text-4xl"><BsCodeSlash/></p>

        
        </Link>

        <div className="ml-auto hidden md:flex items-center">
          <SearchBar />

          <Link
            href={"/notifications"}
            onClick={() => setIsNoti(false)}
            className="cursor-pointer ml-2 mr-2 flex"
          >
           
            <p className="text-3xl"><BsBell/></p>

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
              <BsSun />
            </div>
          ) : (
            <div
              onClick={(): void => {
                document.body.className = "lightmode";
                setMode("lightmode");
              }}
              className="text-3xl ml-2 cursor-pointer"
            >
             <p className="text-2xl"> <BsMoon /></p>
            </div>
          )}

          {isEmail ? (
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  
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
              className="cursor-pointer"
            >
           
              <p className="text-2xl iconHover"><BsHouse />
              </p>
            </Link>
          </div>

          <div className="w-1/4 grid place-items-center">
            <div
              onClick={() => setSearchToggle(!searchToggle)}
              className="cursor-pointer"
            >
             
              <p className="text-2xl iconHover"><BsSearch />
              </p>
            </div>
          </div>

          <div className="w-1/4 grid place-items-center">
            <Link
              href={"/notifications"}
              onClick={() => setIsNoti(false)}
              className="cursor-pointer flex"
            >
             
              <p className="text-2xl iconHover"><BsBell />
              </p>
              {isNoti && <p className="w-2 h-2 rounded-full bg-ascent"></p>}
            </Link>
          </div>

          <div className="w-1/4 grid place-items-center">
            <Link
              href={`/account/${userName}`}
              className="cursor-pointer"
            >
             
              <p className="text-3xl iconHover"><BsPerson />
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
