// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    const SESSION_DURATION_DAYS = 1;
    // Session duration 5 days
    const expiresIn = 60 * 60 * 24 * SESSION_DURATION_DAYS * 1000;

    // Generate session cookie using Firebase admin SDK
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ status: 'success' });

    // Set HTTP-only cookie
    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
  }
}
