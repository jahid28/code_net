import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { commentInterface } from "@/lib/interfaces";
 import { jwtTokenInterface } from "@/lib/interfaces";
 import jwt from "jsonwebtoken";
 export async function POST(req: NextRequest) {
   try {
       const { postId, comment } = await req.json();
    //    const 
    await connectToMongo()
    
    if (!postId || !comment) {
        return NextResponse.json({ success: false, msg: "Please write a comment first." }, { status: 200 });
    }
    const postDetails = await post.findOne({ _id: postId });
    if (!postDetails) {
        return NextResponse.json({ success: false, msg: "Post not found!" }, { status: 200 });
    }

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
        
    const userName = verify.userName;
    const name = verify.name;
    const profilePic = verify.profilePic;
    

    const commentData:commentInterface = {
        user:userName,
        name,
        profilePic,
        comment,
    }
    postDetails.comments.push(commentData);
    await postDetails.save();
    return NextResponse.json({ success: true, msg: "Comment added successfully!" }, { status: 200 });
    
} catch (error) {
       return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 });
    
   }
}