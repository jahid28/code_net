import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { jwtTokenInterface } from "@/lib/interfaces";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value
        // const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)

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
        const { _id } = await req.json()

        const data = await post.find({ _id })

        if (data.length === 0) {
            return NextResponse.json({ success: false, msg: "Post doesnot exist!" }, { status: 200 })
        }

        // data[0].likes+=1

        data[0].likedBy.push(userName)

        // await post.updateOne({ _id }, { likes: data[0].likes })

        await data[0].save()

        return NextResponse.json({ success: true, msg: "Liked!" }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}