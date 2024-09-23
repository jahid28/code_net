import { connectToMongo } from "@/utils/mongo";
import post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";


export async function POST(req: NextRequest) {
    try {
        const { queryArray } = await req.json()

        // const randomNumber:number = Math.floor(Math.random() * 3) + 1;
        // const redisPostList=await redis.lrange(`allPostList${randomNumber}`,0,-1)

        // let profileArray: any = []
        // let postArray: any = []

        await connectToMongo()

        // for (let i = 0; i < queryArray.length; i++) {

        //     let regex = new RegExp(`^${queryArray[i]}$`, 'i');

        //     const nu = await normalUser.find({ $or: [
        //         { userName: regex },
        //         { name: regex }
        //       ] })

        //     if(nu.length>0){
        //         profileArray = [...profileArray, ...nu]
        //     }

        //     const gu = await googleUser.find({ $or: [
        //         { userName: regex },
        //         { name: regex }
        //       ] })

        //     if(gu.length>0){
        //         profileArray = [...profileArray, ...gu]
        //     }

        //     const postSearch = await post.find({ $text: { $search: regex } })

        //     if(postSearch.length>0){
        //         postArray = [...postArray, ...postSearch]
        //     }

        // }


        //     const regex = new RegExp("jahiD", 'i');
        // const posts = await googleUser.find(
        //     { $or: [
        //         { msg: { $in: regexQueries } }
        //         { userName: { $regex: regex } }
        //               ] }


        // );

        const regexQueries = queryArray.map((query: string) => new RegExp(query, 'i')); // 'i' flag for case-insensitive search
        const nuArray = await normalUser.find(
            {
                $or: [
                    { name: { $in: regexQueries } },
                    { userName: { $in: regexQueries } }
                ]
            }
        );
        const guArray = await googleUser.find(
            {
                $or: [
                    { name: { $in: regexQueries } },
                    { userName: { $in: regexQueries } }
                ]
            }
        );
        let postArray = await post.find(
            {
                $or: [
                    { codeType: { $in: regexQueries } },
                    { lang: { $in: regexQueries } },
                    { msg: { $in: regexQueries } }
                ]
            }
        );

        let profileArray = [...nuArray, ...guArray];


        postArray = Array.from(new Set(postArray));
        profileArray = Array.from(new Set(profileArray));


        return NextResponse.json({ success: true, profileArray, postArray }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}