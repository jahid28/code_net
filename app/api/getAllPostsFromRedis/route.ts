import redis from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const redisPostList: string[] = await redis.lrange('allPostList', 0, -1)

        return NextResponse.json({ success: true, redisPostList }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}