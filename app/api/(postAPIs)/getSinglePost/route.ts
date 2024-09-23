import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
import { jwtTokenInterface } from "@/lib/interfaces";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json()
        const token = req.cookies.get("token")?.value
        // const verify: jwtTokenInterface = jwt.verify(token, `${process.env.NEXTAUTH_SECRET}`)

        let verify: jwtTokenInterface | undefined = undefined;

        if (token) {
            try {
                verify = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as jwtTokenInterface;
            } catch (err) {
                verify = undefined;
            }
        }

        if (verify === undefined) {
            return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
        }

        const userName = verify.userName




        await connectToMongo()
        const data = await post.find({ _id })
        if (data.length === 0) {
            return NextResponse.json({ success: false, msg: "Post doesnot exist!" }, { status: 200 })
        }
        let user = await normalUser.find({ userName })
        if (user.length === 0) {
            user = await googleUser.find({ userName })
            if (user.length === 0) {
                return NextResponse.json({ success: false, msg: "User doesnot exist!" }, { status: 200 })
            }
        }


        return NextResponse.json({ success: true, data: data[0], userName, followingList: user[0].following }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}