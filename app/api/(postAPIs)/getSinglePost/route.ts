import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";

export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json()
        await connectToMongo()

        const userName = req.cookies.get("userName")?.value
        if(!userName){
            return NextResponse.json({ success: false, msg: "User not logged in!" }, { status: 400 })
        }


        const data = await post.find({ _id})
        if(data.length===0){
            return NextResponse.json({ success: false, msg: "Post doesnot exist!" }, { status: 400 })
        }
        let user = await normalUser.find({userName})
        if(user.length===0){
            user = await googleUser.find({userName})
            if(user.length===0){
                return NextResponse.json({ success: false, msg: "User doesnot exist!" }, { status: 400 })
            }
        }


        return NextResponse.json({ success: true, data:data[0],userName,followingList:user[0].following }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}