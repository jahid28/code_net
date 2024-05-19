import { connectToMongo } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
export async function POST(req: NextRequest) {
    try {
        let { userToUnFollow,myName } = await req.json();
        
       
        var myself = await normalUser.find({ userName: myName });

        if (myself.length === 0) {
            myself = await googleUser.find({ userName: myName });
            if(myself.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 });
            }
        }

        var other = await normalUser.find({ userName: userToUnFollow });

        if (other.length === 0) {
            other = await googleUser.find({ userName: userToUnFollow });
            if(other.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 400 });
            }
        }

        const newMyselfArr=myself[0].following.filter((item:any)=>item!==userToUnFollow);
        const newOtherArr=other[0].followers.filter((item:any)=>item!==myName);
        myself[0].following=newMyselfArr;
        other[0].followers=newOtherArr;
        await myself[0].save();
        await other[0].save();

        // myself[0].following.push(userToFollow);
        // other[0].followers.push(myName);

        // await myself[0].save();
        // await other[0].save();

       return NextResponse.json({ success: true, msg: "Unfollowed!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 500 });
    }
}