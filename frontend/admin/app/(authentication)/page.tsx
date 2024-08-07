import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    console.log(session?.user.id)
    redirect('/admin');
  } else {
    redirect('/login');
  }

  return null;
}