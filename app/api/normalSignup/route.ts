import { connectToMongo } from "@/utils/mongo";
import normalUser from "@/models/normalUser";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt'
import { Resend } from "resend"
import { revalidatePath } from "next/cache";
import { normalUserInterface } from "@/lib/interfaces";
import googleUser from "@/models/googleUser";

export async function POST(req: NextRequest) {
    try {
        await connectToMongo()

        // const { name, email, password } = await req.json();
        const res = await req.json();
        const name = res.data.name
        const email = res.data.email
        const password = res.data.password
        const userName = res.data.userName

        const checkEmail = await normalUser.find({ email })
        if (checkEmail.length > 0) {
            return NextResponse.json({ success: false, msg: "Email already registered." }, { status: 400 })
        }

        const checkUserName = await normalUser.find({ userName })
        const checkUserName2 = await googleUser.find({ userName })
        if (checkUserName.length > 0 || checkUserName2.length>0) {
            return NextResponse.json({ success: false, msg: "User name already taken." }, { status: 400 })
        }


        const hashPass = await bcrypt.hash(password, 10);


        const data: normalUserInterface = {
            name,
            userName,
            email,
            password: hashPass,
            profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
        }
        await normalUser.insertMany([data])

        cookies().set('userName', `${userName}`, { maxAge: 60 * 60 * 24 })
        cookies().set('profilePic', `${data.profilePic}`, { maxAge: 60 * 60 * 24 })

        return NextResponse.json({ success: true, msg: "Successfully registered" }, { status: 200 })



    } catch (error) {
        // console.log(error)
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })

    }
}