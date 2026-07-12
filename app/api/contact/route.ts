import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for demo. In production, connect to a database.
const submissions: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.();
    const { name, email, subject, message } = body ?? {};

    if (!name?.trim?.() || !email?.trim?.() || !message?.trim?.()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Store submission
    submissions.push({
      name: name?.trim?.() ?? '',
      email: email?.trim?.() ?? '',
      subject: subject?.trim?.() ?? '',
      message: message?.trim?.() ?? '',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Message received!' });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
