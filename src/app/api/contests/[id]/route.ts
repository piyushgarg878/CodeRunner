import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  const { id } = await params;
  try {
    const contest = await prisma.contest.findUnique({
      where: { id:id },
      include: {
        questions: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!contest) {
      return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
    }

    return NextResponse.json(contest);
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 