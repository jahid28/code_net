import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";

export async function POST(req: NextRequest) {
    try {
        const {userName} =await req.json()
        const myName = req.cookies.get("userName")?.value!;
        await connectToMongo()
        
        let myDetails = await normalUser.find({ userName:myName });
        
        if (myDetails.length === 0) {
            myDetails = await googleUser.find({ userName:myName });
            if(myDetails.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 });
            }
        }

        let userDetails = await normalUser.find({ userName });
        
        if (userDetails.length === 0) {
            userDetails = await googleUser.find({ userName });
            if(userDetails.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 });
            }
        }

        
        const data = await post.find({userName})
        
        // if(data.length==0){
        //     return NextResponse.json({ success: false, msg: "No posts found!" }, { status: 400 })
        // }
               

        return NextResponse.json({ success: true, data,followingList:myDetails[0].following,myName,userDetails:userDetails[0]}, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}