// Middleware para verificação de rotas publicas e privadas

import jwt from "jsonwebtoken"
import { type NextRequest, NextResponse } from "next/server"

function removeTokenFromResponse(response: NextResponse) {
    response.cookies.delete("restapp-token")
}

function middleware(req: NextRequest) {
    const token = req.cookies.get("access_key")?.value 
    // const tempToken = req.cookies.get("temp_access_key")?.value

    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
    const isPrivateRoute = req.nextUrl.pathname.startsWith("/user")
    // const isRootPath = req.nextUrl.pathname === "/"

    // if (isRootPath) {
    //     return NextResponse.redirect(new URL("/", req.url))
    // }

    // if (token) {
    //     const decodedToken = jwt.decode(token) as { exp?: number } | null

    //     if (decodedToken?.exp && decodedToken.exp * 1000 < Date.now()) {
    //         const response = NextResponse.redirect(
    //             new URL("/auth/login", req.url)
    //         )
    //         removeTokenFromResponse(response)
    //         return response
    //     }
    // }

    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}

const config = {
    matcher: ["/", "/user/:path*", "/auth/:path*"],
}

export { middleware, config }
