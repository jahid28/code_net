import redis from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";
import { jwtTokenInterface } from "@/lib/interfaces";
const jwt=require("jsonwebtoken")
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const token=req.cookies.get("token")?.value
        const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)

       
        // const name=req.cookies.get("name")
        // const profilePic=req.cookies.get("profilePic")
        // if(userName===undefined || profilePic===undefined){
        //     return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        // }
        
        // const notiListLength = await redis.llen(`noti:${verify.userName}`);
        let noti=false
        // if(notiListLength>0){
            // noti=true
        // }


        return NextResponse.json({ success: true, profilePic:verify.profilePic,userName:verify.userName,noti }, { status: 201 })

        // return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}