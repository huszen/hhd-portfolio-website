// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ status: 'success' });

  // Expire the session cookie immediately
  response.cookies.set('session', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}
