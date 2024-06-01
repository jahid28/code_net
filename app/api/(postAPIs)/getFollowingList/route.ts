import { connectToMongo } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
 import { jwtTokenInterface } from "@/lib/interfaces";
const jwt=require("jsonwebtoken")
export async function GET(req: NextRequest) {
    try {
        const token=req.cookies.get("token")?.value
        const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)
        
        const userName=verify.userName
        
        await connectToMongo()        
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