import redis from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";
import { jwtTokenInterface } from "@/lib/interfaces";
import { connectToMongo } from "@/utils/mongo";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const token=req.cookies.get("token")?.value
        if(token===undefined){
            return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
        }
        // console.log("token",token)
        // const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)


        let verify: jwtTokenInterface | undefined = undefined;

        if (token) {
            // console.log("jwtToken", jwtToken)
            try {
                verify = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as jwtTokenInterface;
            } catch (err) {
                verify = undefined;
            }
        }

        if(verify===undefined){
            return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
        }


        await connectToMongo()        
        let data=await normalUser.find({userName:verify.userName})

        if(data.length===0){
            data=await googleUser.find({userName:verify.userName})
            if(data.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
            }
        }

       
      
        
        const notiListLength = await redis.llen(`noti:${verify.userName}`);
        let noti=false
        if(notiListLength>0){
            noti=true
        }


        return NextResponse.json({ success: true,name:verify.name,profilePic:verify.profilePic, email:verify.email,userName:verify.userName,following:data[0].following,followers:data[0].followers,noti }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}