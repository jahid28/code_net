import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { postInterface } from "@/lib/interfaces";

interface getPostInterface extends postInterface {
    _id: string
}

function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function POST(req: NextRequest) {
    try {
        let { redisPostList } = await req.json();

        await connectToMongo()
        let data: getPostInterface[] = []


        if (redisPostList.length === 0) {
            const randomRedisPostList: string[] = await redis.lrange('allPostList', 0, -1)
            const shuffledItems = shuffle(randomRedisPostList);
            redisPostList = shuffledItems
            for (let i = 0; i < 10; i++) {
                const postFromMongo = await post.findOne({ _id: shuffledItems[i] })
                if (postFromMongo) {
                    data.push(postFromMongo)
                }
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                const postFromMongo = await post.findOne({ _id: redisPostList[i] })
                if (postFromMongo) {
                    data.push(postFromMongo)
                }
            }
        }

        return NextResponse.json({ success: true, data, redisPostList }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}