import { connectToMongo } from "@/utils/mongo";
import normalUser from "@/models/normalUser";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt'
import { normalUserInterface } from "@/lib/interfaces";
import googleUser from "@/models/googleUser";
import jwt from 'jsonwebtoken';
export async function POST(req: NextRequest) {
    try {
        await connectToMongo()
        // const { name, email, password } = await req.json();
        const res = await req.json();
        const name = res.data.name
        const email = res.data.email
        const password = res.data.password
        const userName = res.data.userName
        const profilePic = res.data.profilePic

        const checkEmail = await normalUser.find({ email })
        const checkEmail2 = await googleUser.find({ email })
        if (checkEmail.length > 0 || checkEmail2.length > 0) {
            return NextResponse.json({ success: false, msg: "Email already registered." }, { status: 200 })
        }

        const checkUserName = await normalUser.find({ userName })
        const checkUserName2 = await googleUser.find({ userName })
        if (checkUserName.length > 0 || checkUserName2.length > 0) {
            return NextResponse.json({ success: false, msg: "User name already taken." }, { status: 200 })
        }


        const hashPass = await bcrypt.hash(password, 10);


        const data: normalUserInterface = {
            name,
            userName,
            email,
            password: hashPass,
            profilePic: profilePic !== "" ? profilePic : `${process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PIC}`,
            followers: [],
            following: [],
        }
        await normalUser.insertMany([data])

        // cookies().set('userName', `${userName}`, { maxAge: 60 * 60 * 24 })
        // cookies().set('name', `${data.name}`, { maxAge: 60 * 60 * 24 })
        // cookies().set('profilePic', `${data.profilePic}`, { maxAge: 60 * 60 * 24 }).

        const token = jwt.sign({ name, userName, email, profilePic: data.profilePic }, `${process.env.NEXTAUTH_SECRET}`, { expiresIn: '7d' });

        cookies().set('token', `${token}`, { maxAge: 60 * 60 * 24 * 7 })


        return NextResponse.json({ success: true, msg: "Successfully registered" }, { status: 200 })



    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })

    }
}