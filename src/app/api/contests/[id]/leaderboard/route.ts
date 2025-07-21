import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

// Define the type for the context
type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  req: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { id: contestId } = context.params;
  try {
    const submissions = await prisma.submission.findMany({
      where: { contestId: contestId },
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