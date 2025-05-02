import { Card, CardContent } from "@/components/ui/card"
import { UserType } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export default function ProfileCard({ user }: { user: UserType | null }) {
  return (
    <Card className="w-[320px] shadow-xl border bg-gradient-to-br from-black via-zinc-900 to-gray-950 relative overflow-hidde rounded-none">
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      <CardContent className="p-6 z-10 relative">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(255,221,0,0.4)]">
              <Image
                src={user?.image?.url || ""}
                alt="user-image"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-white drop-shadow-md">{user?.firstName} {user?.lastName}</h2>
            <p className="text-sm text-gray-400 font-mono">@{user?.username}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-base font-medium">{user?.bio}</span>
            </div>
          </div>
          <div className="mt-2 bg-gradient-to-br from-white to-gray-100 border border-gray-200 p-3 rounded-xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]">
            <div className="relative w-[120px] h-[120px] flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://portly.vercel.app/${user?.username}`}
                alt="QR Code"
                className="rounded-xl"
                crossOrigin="anonymous"
              />
            </div>
          </div>
          <Link
            href={`https://portly.vercel.app/${user?.username}`}
            target="_blank"
            className="mt-4 inline-block text-sm font-semibold text-[#FFD300] hover:underline transition-all"
          >
            portly.vercel.app/{user?.username}
          </Link>
          <p className="text-xs text-gray-500 mt-3 italic">powered by <span className="text-[#FFD300] font-semibold">portly</span></p>
        </div>
      </CardContent>
    </Card>
  )
}
