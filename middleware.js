// import { NextResponse, type NextRequest } from 'next/server'
// import { createClient } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   try {
//     // This `try/catch` block is only here for the interactive tutorial.
//     // Feel free to remove once you have Supabase connected.
//     const { supabase, response } = createClient(request)

//     // Refresh session if expired - required for Server Components
//     // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
//     await supabase.auth.getSession()

//     return response
//   } catch (e) {
//     // If you are here, a Supabase client could not be created!
//     // This is likely because you have not set up environment variables.
//     // Check out http://localhost:3000 for Next Steps.
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     })
//   }
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// }

import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server'

export async function middleware(req){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res})

    const {data: {user}} = await supabase.auth.getUser();

    if (user && req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/watch-list', req.url))
    }

    if (!user && req.nextUrl.pathname !== '/'){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res;
}

export const config = {
    matcher: ['/', '/watch-list']
}