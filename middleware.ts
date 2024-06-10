import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { jwtTokenInterface } from "./lib/interfaces";
// import { useDispatch } from 'react-redux';
// import { useSelector } from "react-redux";
export function middleware(req: NextRequest) {
    try {
        const path: string = req.nextUrl.pathname
        const unverifiedPath: boolean = path === '/login' || path === '/signup' || path === '/forgotPassword' || path === '/resetPassword'
        const verifiedPath: boolean = path.startsWith('/account') || path === '/' || path.startsWith('/post') || path == '/notifications' || path == '/searchPage' || path == '/tagSearch'


        const jwtToken: string | undefined = req.cookies.get("token")?.value

        if (unverifiedPath && jwtToken) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
        }

        if (verifiedPath && !jwtToken) {
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

