import { getUser } from "@/lib/api";
import { notFound } from 'next/navigation';
import UserProfile from "./_components/UserProfile";

interface Props {
    params: { username: string };
}

export default async function UserProfilePage({ params }: Props){
    const { username } = await params; 
    const user = await getUser(username);
    if(!user) return notFound() ;

    return <UserProfile user={user}/>
}