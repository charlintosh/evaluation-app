export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/api/card-item/:path*',
    '/((?!api|static|favicon.ico|login|register).*)',
  ],
};
