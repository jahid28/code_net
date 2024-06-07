import { connectToMongo } from "@/utils/mongo";
import normalUser from "@/models/normalUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        // const { email, password } = await req.json();
        const  res = await req.json();
        const email=res.data.email
        const password=res.data.pass

        await connectToMongo()
        // const check = await normalUser.find({ email })
        
        
        
        // const compare = await bcrypt.compare(password, check[0].password);
        
        const hashPass = await bcrypt.hash(password, 10);
        
        await normalUser.updateMany({email},{ $set: { password: hashPass } })
        
        return NextResponse.json({ success: true,msg:"Password updated successfully" }, { status: 201 })
        
        
    } catch (error) {
        return NextResponse.json({ success: false,msg:"Something went wrong!" }, { status: 400 })
    }
}

