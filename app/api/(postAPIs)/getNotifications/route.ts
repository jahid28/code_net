import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { jwtTokenInterface } from "@/lib/interfaces";
import { postInterface } from "@/lib/interfaces";

interface  getPostInterface extends postInterface {
    _id: string;
  
}
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
    try {
      const token=req.cookies.get("token")?.value
      // const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)

      let verify: jwtTokenInterface | undefined = undefined;

      if (token) {
          try {
              verify = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as jwtTokenInterface;
          } catch (err) {
              verify = undefined;
          }
      }

      if (verify === undefined) {
          return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
      }

      const userName=verify.userName

      await connectToMongo()
    
       const allPostIds:Array<string>= await redis.lrange(`noti:${userName}`,0,-1)
       let allPosts:getPostInterface[]=[]

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