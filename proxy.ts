import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "./lib/cookie";

const publicRoutes = ['/login', '/register'];
const adminRoutes = ['/admin/paths'];
export async function proxy(request: NextRequest){
    const  {pathname} = request.nextUrl;
    const token =await getAuthToken();

    const user = token ? await getUserData() : null;

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    

    if(isPublicRoute && token){
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    if(pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/', request.url));    
    }

    return NextResponse.next();

}

export const config = {
    matcher : [
        //what routes to protect
        '/admin/paths',
        '/login',
        '/register'
    ]
}