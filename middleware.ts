import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { pathname, searchParams } = request.nextUrl;

  // Проверяем наличие tokens в URL (email confirmation callback)
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');

  // Если есть tokens в URL - это callback от email confirmation
  if (access_token && refresh_token) {
    // Устанавливаем сессию
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (!error) {
      // Редиректим на dashboard без параметров в URL
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Обновляем сессию
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Если пользователь НЕ авторизован и пытается зайти в dashboard
  if (!session && pathname.startsWith('/dashboard')) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Если пользователь авторизован и пытается зайти на login (но БЕЗ токенов в URL)
  if (session && pathname === '/login' && !access_token) {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};