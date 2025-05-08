import { getUser } from "@/lib/api";
import { notFound } from "next/navigation";
import UserProfile from "./_components/UserProfile";
import { NextPage } from "next";  // Import NextPage

interface Props {
  params: { username: string };
}

const UserProfilePage: NextPage<Props> = async ({ params }) => {
  const { username } = params;
  const user = await getUser(username);

  if (!user) return notFound();

  return <UserProfile user={user} />;
};

export default UserProfilePage;
