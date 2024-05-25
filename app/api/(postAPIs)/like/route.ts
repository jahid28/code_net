import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const userName =  req.cookies.get("userName")
        if(userName===undefined){
            return NextResponse.json({ success: false, msg: "Please login to continue" }, { status: 400 })
        }
        await connectToMongo()
        const { _id } = await req.json()

        const data = await post.find({ _id})

        if(data.length===0){
            return NextResponse.json({ success: false, msg: "Post doesnot exist!" }, { status: 400 })
        }

        // data[0].likes+=1

        data[0].likedBy.push(userName?.value!)

        // await post.updateOne({ _id }, { likes: data[0].likes })

        await data[0].save()

        return NextResponse.json({ success: true, msg: "Liked!" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}