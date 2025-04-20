"use client";

import React, { useState } from "react";
import { useApp } from "@/stores/useApp";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  ChartNoAxesColumnIncreasing,
  CreditCard,
  FolderClosed,
  LogOut,
  PanelLeftClose,
  PanelRightClose,
  User,
} from "lucide-react";

function Sidebar() {
  const { logout } = useApp();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const navItems = [
    { label: "Profile", icon: <User />, href: "/admin" },
    { label: "Projects", icon: <FolderClosed />, href: "/admin/projects" },
    { label: "Resume", icon: <Briefcase />, href: "/admin/resume" },
    { label: "Card", icon: <CreditCard />, href: "/admin/card" },
    {
      label: "Analytics",
      icon: <ChartNoAxesColumnIncreasing />,
      href: "/admin/analytics",
    },
  ];

  return (
    <div
      className={`border-[#191919] border bg-[#111111] ${
        isOpen ? "w-56" : "w-20"
      } m-3 px-3 py-5 rounded-xl shadow-sm transition-all duration-300 relative min-h-screen flex flex-col justify-between`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-6 z-10 bg-[#191919] p-1.5 rounded-full border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer"
      >
        {isOpen ? (
          <PanelLeftClose size={20} className="text-gray-300" />
        ) : (
          <PanelRightClose size={20} className="text-gray-300" />
        )}
      </div>

      <ul className="flex flex-col gap-5">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center gap-5 p-3 rounded-md transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-yellow-400 text-[#242424]"
                      : "hover:bg-yellow-400 hover:text-[#242424]"
                  }`}
              >
                <span className="group-hover:scale-105 transition-transform duration-200 text-xl">
                  {item.icon}
                </span>
                <span
                  className={`whitespace-nowrap text-[17px] font-manrope transition-all duration-300 font-semibold ${
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

 
      <div
        className={`flex items-center gap-5 p-3 rounded-md transition-all duration-300 group cursor-pointer  hover:bg-[#2a2a2a] text-red-500`}
        onClick={()=>logout(router.push)}
        
      >
        <span className="group-hover:scale-105 transition-transform duration-200 text-xl">
          <LogOut />
        </span>
        <span
          className={`whitespace-nowrap text-[17px] font-manrope transition-all duration-300 font-semibold ${
            isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 pointer-events-none"
          }`}
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
