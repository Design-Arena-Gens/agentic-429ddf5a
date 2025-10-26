import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  return new Response(null, { status: 200 });
}
export const config = { matcher: [] };
