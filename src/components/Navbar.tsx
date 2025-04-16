import { Button } from "./ui/button"

function Navbar() {
    return (
        <div className="px-20 py-3 flex justify-between">
            <div className="font-playfair text-3xl font-bold tracking-wide cursor-pointer">
                <span>Portly</span>
            </div>

            <div className="flex items-center gap-2">
                <Button className="rounded-lg" variant={"outline"}>Login</Button>
                <Button variant={"secondary"} className="rounded-lg">Create Profile</Button>
            </div>
        </div>
    )
}

export default Navbar