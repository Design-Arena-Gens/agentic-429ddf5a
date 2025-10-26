import { NextResponse } from 'next/server';
import { computeFinancials, type FinancialInputs } from '@/lib/finance';

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<FinancialInputs>;
  const defaults: FinancialInputs = {
    monthlyRevenueLakh: 12,
    monthlyCostLakh: 8,
    capexLakh: 15,
    interestRatePct: 12,
    loanTenorYears: 5,
    taxRatePct: 25,
    depreciationPct: 15,
  };
  const inputs = { ...defaults, ...body } as FinancialInputs;
  const out = computeFinancials(inputs);
  return NextResponse.json({ inputs, outputs: out });
}
