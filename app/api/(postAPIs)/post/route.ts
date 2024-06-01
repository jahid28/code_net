import { connectToMongo } from "@/utils/mongo";
import redis from "@/utils/redis";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { postInterface } from "@/lib/interfaces";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
import { jwtTokenInterface } from "@/lib/interfaces";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const jwt = require('jsonwebtoken');
function shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


async function shuffleRedisListWithNewValue(listKey: string, newValue: string) {
    // let allPostsfromRedis = []
    // const what = await post.find()
    // for(let i=0;i<what.length;i++){
    //     allPostsfromRedis.push(what[i]._id.toString())
    // }
    const allPostsfromRedis = await redis.lrange(listKey, 0, -1)


    //   allPostsfromRedis.map((post)=>{
    allPostsfromRedis.push(newValue);
    //   })

    const shuffledItems = shuffle(allPostsfromRedis);

    await redis.del(listKey)

    shuffledItems.map(async (post) => {
        await redis.rpush(listKey, post)
    })


}


export async function POST(req: NextRequest) {
    try {
        let { codeType, msg, code, lang, imagesForMongoDB } = await req.json();
        // const email=res.data.email
        // const password=res.data.password
        // const { email, password } = await req.json();
        if (code == "") {
            code = " "
        }
        const token = req.cookies.get("token")?.value
        const verify: jwtTokenInterface = jwt.verify(token, `${process.env.NEXTAUTH_SECRET}`)

        const userName = verify.userName
        const name = verify.name
        const profilePic = verify.profilePic
        // if (userName === undefined || name === undefined || profilePic === undefined) {
        //     return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        // }
        let checkUser = await normalUser.find({ userName })
        if (checkUser.length === 0) {
            checkUser = await googleUser.find({ userName })
            if (checkUser.length === 0) {
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
            }
        }
        // if(checkUser.length===0 && checkUser2.length===0){
        //     return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 })
        // }

        //     getUserInfo=await googleUser.find({userName:userName?.value!})
        //     if(getUserInfo.length===0){
        //         return NextResponse.json({ success: false, msg: "User doesnot exist!" }, { status: 400 })

        //     }
        // }

        const postDetails: postInterface = {
            userName,
            name,
            profilePic,
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
        console.log("gemmmm ", result.response.text());

        if(result.response.text().toLowerCase().includes("no")){
            return NextResponse.json({ success: false, msg: "Please post something related to programming, coding or tech" }, { status: 400 })
        }





        await connectToMongo()
        const postToInsert = await post.insertMany([postDetails])

        for (let i = 0; i < checkUser[0].followers.length; i++) {
            await redis.rpush(`noti:${checkUser[0].followers[i]}`, postToInsert[0]._id.toString())
        }

        shuffleRedisListWithNewValue('allPostList1', postToInsert[0]._id.toString())
        shuffleRedisListWithNewValue('allPostList2', postToInsert[0]._id.toString())
        shuffleRedisListWithNewValue('allPostList3', postToInsert[0]._id.toString())


        return NextResponse.json({ success: true, msg: "Successfully posted" }, { status: 200 })


    } catch (error) {
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
//         // toast.success("Enter the OTP sent to your Email");
//     })
//     .catch(()=>{
//         // toast.error("Something went wrong!");
//       })
// }