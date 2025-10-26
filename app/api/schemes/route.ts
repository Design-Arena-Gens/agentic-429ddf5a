import { NextResponse } from 'next/server';
import { matchSchemes } from '@/lib/schemes';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get('sector') || 'food_processing';
  const state = searchParams.get('state') || 'AP';
  const matched = matchSchemes({ sector, state });
  return NextResponse.json({ sector, state, schemes: matched });
}
