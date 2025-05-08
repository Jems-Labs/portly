
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/api';
import UserProfile from './_components/UserProfile';
import { UserType } from '@/lib/types';

export async function generateStaticParams() {
  // Fetch the usernames from your backend (e.g., API or database)
  const response = await fetch(`${process.env.NODE_ENV === "production"
      ? "https://portly.netlify.app/"
      : "http://localhost:3000/"
    }api/fetch-users`);
  const users: UserType[] = await response.json();

  const usernames = users.map((user) => user.username);

  return usernames.map((username) => ({ username }));
}


type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfilePage({ params }: Props) {
  const user = await getUser(params.username);

  if (!user) return notFound();

  return <UserProfile user={user} />;
}
