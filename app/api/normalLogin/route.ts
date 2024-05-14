import { connectToMongo } from "@/utils/mongo";
import normalUser from "@/models/normalUser";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt'
import { Resend } from "resend"
import { revalidatePath } from "next/cache";
import { normalUserInterface } from "@/lib/interfaces";

export async function POST(req: NextRequest) {
    try {
        const  res = await req.json();
        const email=res.data.email
        const password=res.data.password
        // console.log("00000000000000000 ",data)
        // const { email, password } = await req.json();

        await connectToMongo()

        const check = await normalUser.find({ email })

        if (check.length <= 0) {
            return NextResponse.json({ success: false, msg: "Email is not registered" }, { status: 400 })

        }

        const compare = await bcrypt.compare(password, check[0].password);

        if (compare) {
            cookies().set('userName', `${check[0].userName}`, { maxAge: 60 * 60 * 24 })
            cookies().set('profilePic', `${check[0].profilePic}`, { maxAge: 60 * 60 * 24 })
            return NextResponse.json({ success: true, msg: "Successfully logged in" }, { status: 201 })

        }
        else {
            return NextResponse.json({ success: false, msg: "Invalid credentials" }, { status: 201 })
        }



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