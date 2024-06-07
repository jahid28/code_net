import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
import { jwtTokenInterface } from "@/lib/interfaces";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
    try {
        const {userName} =await req.json()
        const token=req.cookies.get("token")?.value
        // const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)

        let verify: jwtTokenInterface | undefined = undefined;

        if (token) {
            // console.log("jwtToken", jwtToken)
            try {
                verify = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as jwtTokenInterface;
            } catch (err) {
                verify = undefined;
            }
        }

        if (verify === undefined) {
            return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
        }

        const myName = verify.userName
        
        await connectToMongo()
        
        let myDetails = await normalUser.find({ userName:myName });
        
        if (myDetails.length === 0) {
            myDetails = await googleUser.find({ userName:myName });
            if(myDetails.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
            }
        }

        let userDetails = await normalUser.find({ userName });
        
        if (userDetails.length === 0) {
            userDetails = await googleUser.find({ userName });
            if(userDetails.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
            }
        }

        
        const data = await post.find({userName})
        
        
               

        return NextResponse.json({ success: true, data,followingList:myDetails[0].following,myName,userDetails:userDetails[0]}, { status: 200 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}