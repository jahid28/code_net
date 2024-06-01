import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { commentInterface } from "@/lib/interfaces";
 import { jwtTokenInterface } from "@/lib/interfaces";
 const jwt=require("jsonwebtoken")
export async function POST(req: NextRequest) {
   try {
       const { postId, comment } = await req.json();
    //    const 
    await connectToMongo()
    
    if (!postId || !comment) {
        return NextResponse.json({ success: false, msg: "Please fill all the fields." }, { status: 400 });
    }
    const postDetails = await post.findOne({ _id: postId });
    if (!postDetails) {
        return NextResponse.json({ success: false, msg: "Post not found!" }, { status: 400 });
    }

    const token=req.cookies.get("token")?.value
        const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)
        
    const userName = verify.userName;
    const name = verify.name;
    const profilePic = verify.profilePic;
    // if(userName===undefined || name===undefined || profilePic ===undefined){
    //     return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
    // }

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