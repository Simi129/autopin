import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { pathname, searchParams } = request.nextUrl;

  // Проверяем наличие tokens в URL (email confirmation callback)
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');

  // Если есть tokens - устанавливаем сессию и редиректим
  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (!error) {
      // Редиректим на dashboard БЕЗ параметров
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // ВАЖНО: Обновляем session через getUser для правильной установки cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Если пользователь НЕ авторизован и пытается зайти в dashboard
  if (!user && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если пользователь авторизован и пытается зайти на login (БЕЗ tokens)
  if (user && pathname === '/login' && !access_token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};