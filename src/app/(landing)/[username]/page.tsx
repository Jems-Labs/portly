import { notFound } from 'next/navigation';
import { getUser } from '@/lib/api';
import UserProfile from './_components/UserProfile';

type PageProps = {
  params: {
    username: string;
  };
};

export default async function UserProfilePage({ params }: PageProps) {
  const user = await getUser(params.username);

  if (!user) return notFound();

  return <UserProfile user={user} />;
}
