import { NextResponse } from 'next/server';
import { generateNarrative } from '@/utils/nlg';

export async function POST(req: Request) {
  const body = await req.json();
  const text = generateNarrative(body);
  return NextResponse.json({ text });
}
