import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// const jwt = require('jsonwebtoken');
export function middleware(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname
        const unverifiedPath = path === '/login' || path === '/signup' || path === '/forgotPassword' || path === '/resetPassword'
        const verifiedPath = path.startsWith('/account') || path === '/' || path.startsWith('/post') || path == '/notifications' || path == '/searchPage'


        const userName = req.cookies.get("token")?.value || ''
        // const verify = jwt.verify(userName, `${process.env.NEXTAUTH_SECRET}`)


        if (unverifiedPath && userName) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
        }

        if (verifiedPath && !userName) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}


// export const config={
//     matcher:[
//         '/',
//         '/account/*'
//     ]
// }

