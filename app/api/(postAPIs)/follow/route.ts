import { connectToMongo } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";
import normalUser from "@/models/normalUser";
import googleUser from "@/models/googleUser";
export async function POST(req: NextRequest) {
    try {
        let { userToFollow,myName } = await req.json();

        await connectToMongo()
       
        let myself = await normalUser.find({ userName: myName });

        if (myself.length === 0) {
            myself = await googleUser.find({ userName: myName });
            if(myself.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
            }
        }

        let other = await normalUser.find({ userName: userToFollow });

        if (other.length === 0) {
            other = await googleUser.find({ userName: userToFollow });
            if(other.length===0){
                return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
            }
        }
        if(myself[0].following.includes(userToFollow) || other[0].followers.includes(myName)){
            return NextResponse.json({ success: false, msg: "Already following!" }, { status: 200 });
        
        }

        myself[0].following.push(userToFollow);
        other[0].followers.push(myName);

        await myself[0].save();
        await other[0].save();

       return NextResponse.json({ success: true, msg: "Followed!" });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 });
    }
}