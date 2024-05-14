import { connectToMongo } from "@/utils/mongo";
// import normalUser from "@/models/normalUser";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import bcrypt from 'bcrypt'
// import { Resend } from "resend"
// import { revalidatePath } from "next/cache";
// import { normalUserInterface } from "@/lib/interfaces";
import { postInterface } from "@/lib/interfaces";

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

        const userName = req.cookies.get("userName")

        const postDetails: postInterface = {
            userName: userName?.value!,
            codeType,
            msg,
            code,
            lang,
            imagesForMongoDB,
            date: new Date(),
            likes: 0,
            commentsNum: 0,
            comments: [{ user: "jk", comment: "great post" }]
        }


        await connectToMongo()


        await post.insertMany([postDetails])

        return NextResponse.json({ success: true, msg: "Successfully posted" }, { status: 200 })


    } catch (error) {
        // console.log(error)
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