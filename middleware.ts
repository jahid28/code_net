import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req:NextRequest){
    const path=req.nextUrl.pathname
    const unverifiedPath=path==='/login' || path==='/signup' || path==='/forgotPassword' || path==='/resetPassword'
    const verifiedPath=path.startsWith('/account') || path==='/' || path.startsWith('/post')
    

    const userName=req.cookies.get("userName")?.value || ''

    if(unverifiedPath && userName){
        return NextResponse.redirect(new URL('/',req.nextUrl))
    }
    
    if(verifiedPath && !userName){
        return NextResponse.redirect(new URL('/login',req.nextUrl))
    }
}


// export const config={
//     matcher:[
//         '/',
//         '/account/*'
//     ]
// }

