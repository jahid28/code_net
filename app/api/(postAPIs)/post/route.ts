import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
// import normalUser from "@/models/normalUser";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import bcrypt from 'bcrypt'
// import { Resend } from "resend"
// import { revalidatePath } from "next/cache";
// import { normalUserInterface } from "@/lib/interfaces";
import { postInterface } from "@/lib/interfaces";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";

export async function POST(req: NextRequest) {
    try {
        let { codeType, msg, code, lang, imagesForMongoDB } = await req.json();
        // const email=res.data.email
        // const password=res.data.password
        // console.log("00000000000000000 ",data)
        // const { email, password } = await req.json();
        if (code == "") {
            code = " "
        }

        const userName =  req.cookies.get("userName")
        const name =  req.cookies.get("name")
        const profilePic =  req.cookies.get("profilePic")
        if(userName===undefined || name===undefined || profilePic ===undefined){
            return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        }
        let checkUser=await normalUser.find({userName:userName?.value!})
        if(checkUser.length===0){
             checkUser=await googleUser.find({userName:userName?.value!})
             if(checkUser.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
             }
        } 
        // if(checkUser.length===0 && checkUser2.length===0){
        //     return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        // }
        // console.log("uName is ",userName)
        // var getUserInfo=await normalUser.find({userName:userName?.value!})
        // console.log("info1 is ",getUserInfo)
        // if(getUserInfo.length===0){
        //     getUserInfo=await googleUser.find({userName:userName?.value!})
        //     if(getUserInfo.length===0){
        //         return NextResponse.json({ success: false, msg: "User doesnot exist!" }, { status: 400 })

        //     }
        // }

        // console.log("info is ",getUserInfo)




        const postDetails: postInterface = {
            userName: userName?.value!,
            name:name?.value!,
            profilePic:profilePic?.value!,
            // name:getUserInfo[0].name,
            // profilePic:getUserInfo[0].profilePic,
            codeType,
            msg,
            code,
            lang,
            imagesForMongoDB,
            date: new Date(),
            // likes: 0,
            likedBy: [],
            // commentsNum: 0,
            comments: []
        }


        await connectToMongo()

        const postToInsert= await post.insertMany([postDetails])

        for(let i=0;i<checkUser[0].followers.length;i++){
            await redis.rpush(checkUser[0].followers[i],postToInsert[0]._id.toString())
        }
               
                // Delete the entire list
                // await redis.del('myList');
                // console.log('List deleted successfully.');
          



        return NextResponse.json({ success: true, msg: "Successfully posted" }, { status: 200 })


    } catch (error) {
        console.log("oooooooooooo ",error )
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}




// export async function GET(){
//     const resend=new Resend(process.env.NEXT_PUBLIC_RESEND_API)

//     await resend.emails.send({
//         from:'jahidrhps123@gmail.com',
//         to:"jahidkhan777367@gmail.com",
//         subject:"CodeNet Reset Password",
//         text:`OTP is 77. Use this code to reset your password in CodeNet`
//       }).then(()=>{
//         console.log("gg")
//         // toast.success("Enter the OTP sent to your Email");
//     })
//     .catch(()=>{
//           console.log("ff")
//         // toast.error("Something went wrong!");
//       })
// }