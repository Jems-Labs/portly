import { Copyright } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
    return (
        <footer className="border-t py-4 px-4 md:px-8 bg-background">
            <Image src={'/logo/portly.png'} height={100} width={100} alt="logo" className="my-3"/>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Copyright size={13} />
                    <span>2025 Portly by Jems Labs</span>
                </div>
                <p>All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
