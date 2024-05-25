// import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
// import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const userName=req.cookies.get("userName")
        // const name=req.cookies.get("name")
        const profilePic=req.cookies.get("profilePic")
        if(userName===undefined || profilePic===undefined){
            return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        }
        const notiListLength = await redis.llen(`noti:${userName?.value!}`);
        let noti=false
        if(notiListLength>0){
            noti=true
        }


        return NextResponse.json({ success: true, profilePic:profilePic?.value!,userName:userName?.value!,noti }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}