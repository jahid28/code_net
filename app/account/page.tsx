"use client"
import React, { useEffect } from 'react'
import { signOut,useSession } from 'next-auth/react'
import { FaGithub,FaGoogle } from "react-icons/fa";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// useEffect
// getCookie
const page = () => {
  const router=useRouter()
  const session = useSession();

  // if (session.status == "unauthenticated") {
  //   router.replace("/login");
  // }

  useEffect(()=>{
    if(getCookie("email")==undefined){
    router.replace("/login")
    }
  },[])

  function logout(){
// signOut()
deleteCookie("email")
deleteCookie("profilePic")
// deleteCookie("next-auth.session-token")
// setCookie("next-auth.callback-url","http%3A%2F%2Flocalhost%3A3000%2Faccount")
// setTimeout(() => {
  router.replace("/login")
// }, 2000);

  }
  return (
    <div>
      {/* <Link onClick={()=>{}} href={"login"}> */}
<button onClick={()=>{signOut()
  logout()
}} className="w-full mt-20 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
Submit
</button>
      {/* </Link> */}
    </div>
  )
}

export default page
