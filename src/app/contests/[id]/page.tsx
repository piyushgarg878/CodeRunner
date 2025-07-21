import { prisma } from '@/lib/prisma';
import ContestArena from './ContestArena';
import { notFound } from 'next/navigation';

async function getContest(id: string) {
  const contest = await prisma.contest.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
  return contest;
}

export default async function ContestArenaPage({ params }: { params: { id: string } }) {
  const contest = await getContest(params.id);

  if (!contest) {
    notFound();
  }

  return <ContestArena initialContest={contest} />;
} 