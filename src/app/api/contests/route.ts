import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  console.log('POST request received');
  try {
    const { name, description, start, end } = await req.json();
    const contest = await prisma.contest.create({
      data: {
        name,
        description,
        start: new Date(start),
        end: new Date(end),
        isActive: new Date(start) <= new Date() && new Date(end) >= new Date(),
      },
    });
    return NextResponse.json(contest);
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
  const contests = await prisma.contest.findMany({
    orderBy: { start: 'desc' },
  });
  return NextResponse.json(contests);
} 