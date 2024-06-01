import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
 

export async function POST(req: NextRequest) {
    try {
        const {_id} = await req.json()
        
        await connectToMongo()
        await post.deleteOne({ _id})

        return NextResponse.json({ success: true, msg: "Post deleted!" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}