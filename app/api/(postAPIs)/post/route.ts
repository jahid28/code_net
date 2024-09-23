import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import no_of_posts from "@/models/no_of_posts";
import { NextRequest, NextResponse } from "next/server";
import { postInterface } from "@/lib/interfaces";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
import { jwtTokenInterface } from "@/lib/interfaces";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
    try {
        let { codeType, msg, code, lang, imagesForMongoDB } = await req.json();
        if (code == "") {
            code = " "
            lang = "None"
        }
        const token = req.cookies.get("token")?.value

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
        const name = verify.name
        const profilePic = verify.profilePic

        let checkUser = await normalUser.find({ userName })
        if (checkUser.length === 0) {
            checkUser = await googleUser.find({ userName })
            if (checkUser.length === 0) {
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 })
            }
        }


        const postDetails: postInterface = {
            userName,
            name,
            profilePic,
            codeType,
            msg,
            code,
            lang,
            imagesForMongoDB,
            date: new Date(),
            likedBy: [],
            comments: []
        }


        const apiKey = process.env.GEMINI_API_KEY!;
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: [
            ],
        });

        const result = await chatSession.sendMessage(
            `"${msg}"
        Is this message about programming/coding/tech? yes or no`
        );

        await connectToMongo()

        await no_of_posts.updateOne(
            { _id: new Object('6669de36beb425e5f97e7850') },
            { $inc: { no_of_post_req_doc: 1 } }
        );



        if (result.response.text().toLowerCase().includes("no")) {
            return NextResponse.json({ success: false, msg: "Please post something related to programming, coding or tech" }, { status: 200 })
        }


        const postToInsert = await post.insertMany([postDetails])

        for (let i = 0; i < checkUser[0].followers.length; i++) {
            await redis.rpush(`noti:${checkUser[0].followers[i]}`, postToInsert[0]._id.toString())
        }

        await redis.rpush('allPostList', postToInsert[0]._id.toString())


        return NextResponse.json({ success: true, msg: "Successfully posted" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}