import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";

export async function GET(req: NextRequest) {
    try {
        await connectToMongo()
        // const { user } = await req.json()
        const userName=req.cookies.get("userName")?.value

        let data=await normalUser.find({userName})

        if(data.length===0){
            data=await googleUser.find({userName})
            if(data.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 });
            }
        }


        return NextResponse.json({ success: true, data:data[0].following,userName }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}