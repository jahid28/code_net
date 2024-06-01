import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
var jwt = require('jsonwebtoken');
export async function GET(req: NextRequest) {
    try {
        const randomNumber:number = Math.floor(Math.random() * 3) + 1;
        const redisPostList=await redis.lrange(`allPostList${randomNumber}`,0,-1)
        await connectToMongo()
        let data = []

        for(let i=0;i<10;i++){
            const postFromMongo=await post.findOne({_id:redisPostList[i]})
            if(postFromMongo){
                data.push(postFromMongo)
            }
        }

        const token = jwt.sign( {name:"kkk"}, 'secret', { expiresIn: '1h' });

        // const token = await decode({"secret"})



        // const data = await post.find()

        return NextResponse.json({ success: true, data,redisPostList }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}