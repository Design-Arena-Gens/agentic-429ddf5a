import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { lang, input } = body as { lang: 'en'|'te'; input: string };

  const message = lang === 'te'
    ? `మీ ఇన్‌పుట్ అందింది. ప్రాథమిక విశ్లేషణ సిద్ధం చేయబడింది.`
    : `Input received. Preliminary analysis prepared.`;

  return NextResponse.json({ message, keyInsights: [
    'Working capital cycle assumed 45 days',
    'Capex depreciated at 15% WDV',
    'GST assumed at 18% for inputs'
  ]});
}
