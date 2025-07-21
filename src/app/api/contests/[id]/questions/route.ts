import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

export async function POST(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  try {
    const { title, description, testcases, points } = await req.json();
    const question = await prisma.question.create({
      data: {
        contestId:id,
        title,
        description,
        testcases,
        points,
      },
    });
    return NextResponse.json(question);
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 