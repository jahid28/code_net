// import { connectToMongo } from "@/utils/mongo";
// import { NextRequest, NextResponse } from "next/server";
// import normalUser from "@/models/normalUser";
// import googleUser from "@/models/googleUser";
//  import { jwtTokenInterface } from "@/lib/interfaces";
// export async function GET(req: NextRequest) {
//     try {
//         const token=req.cookies.get("token")?.value
//         // const verify:jwtTokenInterface=jwt.verify(token,`${process.env.NEXTAUTH_SECRET}`)

//         let verify: jwtTokenInterface | undefined = undefined;

//         if (token) {
//             // console.log("jwtToken", jwtToken)
//             try {
//                 verify = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as jwtTokenInterface;
//             } catch (err) {
//                 verify = undefined;
//             }
//         }

//         if (verify === undefined) {
//             return NextResponse.json({ success: false, msg: "Token not found!" }, { status: 200 })
//         }
        
//         const userName=verify.userName
        
//         await connectToMongo()        
//         let data=await normalUser.find({userName})

//         if(data.length===0){
//             data=await googleUser.find({userName})
//             if(data.length===0){
//                 return NextResponse.json({ success: false, msg: "User donot exist!" }, { status: 200 });
//             }
//         }


//         return NextResponse.json({ success: true, data:data[0].following,userName }, { status: 201 })

//     } catch (error) {

//         return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
//     }
// }