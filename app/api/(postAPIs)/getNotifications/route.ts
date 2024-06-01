import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

import { jwtTokenInterface } from "@/lib/interfaces";
const jwt=require("jsonwebtoken")
export async function GET(req: NextRequest) {
    try {
      const token=req.cookies.get("token")?.value
      const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)
      const userName=verify.userName

      await connectToMongo()
    
       const allPostIds:Array<string>= await redis.lrange(`noti:${userName}`,0,-1)
       let allPosts:any=[]

       await Promise.all(allPostIds.map(async (postId) => {
        const singlePost = await post.findOne({ _id: postId });
        if (singlePost) {
          allPosts.push(singlePost);
        }
      }));

      await redis.del(`noti:${userName}`)


        return NextResponse.json({ success: true, data:allPosts }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}