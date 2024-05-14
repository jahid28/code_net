import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req:NextRequest){
    const path=req.nextUrl.pathname
    const loginSignupPath=path==='/login' || path==='/signup'
    const accountPath=path.startsWith('/account')
    

    const userName=req.cookies.get("userName")?.value || ''

    if(loginSignupPath && userName){
        return NextResponse.redirect(new URL('/',req.nextUrl))
    }
    if(accountPath && !userName){
        return NextResponse.redirect(new URL('/',req.nextUrl))
    }
}


// export const config={
//     matcher:[
//         '/',
//         '/account/*'
//     ]
// }

