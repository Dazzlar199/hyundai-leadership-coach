"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/hyundai_logo2.png"
        alt="Hyundai Logo"
        width={80}
        height={20}
        priority
      />
    </Link>
  );
}

export function Navbar() {
  const menuItems = [
    { name: "진단", path: "/assess" },
    { name: "시나리오", path: "/scenarios" },
    // { name: "Coach", path: "/coach" },
    // { name: "Voice", path: "/voice" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-4 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="transition-colors hover:text-foreground/80 text-foreground/60 px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
