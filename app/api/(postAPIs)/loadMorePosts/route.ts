import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { redisPostList, loadNumber } = await req.json();

        let data = []

        await connectToMongo()

        for (let i = loadNumber * 10; i < loadNumber * 10 + 10; i++) {
            const postFromMongo = await post.findOne({ _id: redisPostList[i] })
            if (postFromMongo) {
                data.push(postFromMongo)
            }
        }


        return NextResponse.json({ success: true, data }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}