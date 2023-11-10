import Hero from '@/components/Hero';
import { DealsRecord, getXataClient } from '@/xata';
import DealsList from '../DealsList';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { isAdminUser } from '@/utils/auth';

export default async function Home() {
  const xataClient = getXataClient();
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }
  const isAdmin = await isAdminUser(userId);
  if (!isAdmin) {
    return redirect('/');
  }
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: false })
    .sort('xata.createdAt', 'desc')
    .getMany();
  return (
    <main>
      <h1 className="text-4xl font-bold mb-10 text-center">Dashboard</h1>
      <DealsList deals={deals} isAdmin={true} />
    </main>
  );
}
