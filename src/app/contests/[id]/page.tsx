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

export default async function ContestArenaPage({params}: {params: Promise<{ id: string }>}) {
    const {id} = await params;
  const contest = await getContest(id);

  if (!contest) {
    notFound();
  }

  return <ContestArena initialContest={contest} />;
} 