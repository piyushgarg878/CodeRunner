import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const submissions = await prisma.submission.findMany({
      where: { contestId: params.id },
      select: {
        userId: true,
        score: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // Aggregate scores
    const leaderboardMap = new Map<string, { username: string; totalScore: number }>();
    for (const sub of submissions) {
      const existing = leaderboardMap.get(sub.userId);
      if (existing) {
        existing.totalScore += sub.score;
      } else {
        leaderboardMap.set(sub.userId, {
          username: sub.user.username,
          totalScore: sub.score,
        });
      }
    }

    const leaderboard = Array.from(leaderboardMap.values()).sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return NextResponse.json(leaderboard);
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 