import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
 

export async function POST(req: NextRequest) {
    try {
        const { tagsArr } = await req.json()
       
        await connectToMongo()


        // const regexQueries = tagsArr.map((query: any) => new RegExp(query, 'i')); // 'i' flag for case-insensitive search
        // const nuArray = await normalUser.find(
        //     {
        //         $or: [
        //             { name: { $in: tagsArr } },
        //             { userName: { $in: tagsArr } }
        //         ]
        //     }
        // );
        // const guArray = await googleUser.find(
        //     {
        //         $or: [
        //             { name: { $in: regexQueries } },
        //             { userName: { $in: regexQueries } }
        //         ]
        //     }
        // );
        let postArray = await post.find(
            {
                $or: [
                    { codeType: { $in: tagsArr } },
                    { lang: { $in: tagsArr } },
                ]
            }
        );

        // let profileArray = [...nuArray, ...guArray];


        // postArray = Array.from(new Set(postArray));
        // profileArray = Array.from(new Set(profileArray));


        return NextResponse.json({ success: true, postArray }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}