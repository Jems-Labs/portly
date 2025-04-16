import Link from "next/link"
import { Button } from "./ui/button"

function Navbar() {
    return (
        <div className="px-20 py-3 flex justify-between">
            <div className="font-playfair text-3xl font-bold tracking-wide cursor-pointer">
                <span>Portly</span>
            </div>

            <div className="flex items-center gap-2">
                <Link href={'/login'}>
                <Button className="rounded-lg" variant={"outline"}>Login</Button>
                </Link>
                <Link href={'/signup'}>
                <Button variant={"secondary"} className="rounded-lg">Create Profile</Button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar