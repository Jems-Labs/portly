"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useApp } from "@/stores/useApp";
import { ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user } = useApp();
  const router = useRouter()

  return (
    <header className="px-4 py-2 border m-3 rounded-xl flex items-center justify-between bg-[#111111]">
      <Link href={'/'}>
        <Image src={'/logo/portly.png'} height={90} width={90} alt="logo" />
      </Link>

      <div className="flex items-center gap-5">
        {user ?
          <Link
            href={`/${user?.username}`}
            className="text-sm px-4 py-1 rounded-full flex items-center gap-1 border hover:underline"
          >
            @{user?.username}
            <ExternalLink size={14} className="ml-1" />
          </Link>
          : " "}
        {user ?
          <Button onClick={() => router.push("/admin")} className="flex items-center">Admin <ChevronRight /></Button>
          : <div className="flex items-center gap-3">
            <Button variant={"outline"} onClick={() => router.push("/login")} className="bg-black">Login</Button>
            <Button onClick={() => router.push("/signup")}>Signup</Button>
          </div>
        }
      </div>
    </header>
  );
}

export default Navbar;
