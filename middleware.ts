import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

const URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


export async function middleware(request: NextRequest) {
  // Autoriser uniquement les requêtes locales pour l'API CRON
  if (request.nextUrl.pathname.startsWith(`${URL}/api/cron`)) {
    const requestHeaders = new Headers(request.headers);
    const hostname = requestHeaders.get('host') || '';

    if (!hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes(URL)) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      );
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
