"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LeaderboardPage() {
  const params = useParams();
  const contestId = params.id as string;

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contestId) return;

    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch(`/api/contests/${contestId}/leaderboard`);
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [contestId]);

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
      <div style={{ background: '#181818', borderRadius: '16px', boxShadow: '0 2px 16px #0004', padding: '48px', maxWidth: '700px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#61dafb', marginBottom: '32px' }}>Contest Leaderboard</h1>
        {loading && <div style={{ color: '#bbb' }}>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #61dafb' }}>
                <th style={{ padding: '12px 16px', fontSize: '18px' }}>Rank</th>
                <th style={{ padding: '12px 16px', fontSize: '18px' }}>Username</th>
                <th style={{ padding: '12px 16px', fontSize: '18px' }}>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.username} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '12px 16px', fontSize: '17px', fontWeight: 700 }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px', fontSize: '17px' }}>{user.username}</td>
                  <td style={{ padding: '12px 16px', fontSize: '17px' }}>{user.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link href={`/contests`} style={{ marginTop: '32px', display: 'inline-block', color: '#61dafb', textDecoration: 'underline' }}>
          ← Back to Contests
        </Link>
      </div>
    </div>
  );
} 