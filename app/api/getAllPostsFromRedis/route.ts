// import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
// import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
// import { postInterface } from "@/lib/interfaces";
// interface getPostInterface extends postInterface {
//     _id: string
// }
export async function GET(req: NextRequest) {
    try {
        // const randomNumber:number = Math.floor(Math.random() * 3) + 1;
        const redisPostList:string[]=await redis.lrange('allPostList',0,-1)
        // await connectToMongo()
        // let data:getPostInterface[] = []
        // let redisPostList:string[] = []

        // for(let i=0;i<10;i++){
        //     const postFromMongo:getPostInterface | null=await post.findOne({_id:redisPostList[i]})
        //     if(postFromMongo){
        //         data.push(postFromMongo)
        //     }
        // }

        return NextResponse.json({ success: true,redisPostList }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}