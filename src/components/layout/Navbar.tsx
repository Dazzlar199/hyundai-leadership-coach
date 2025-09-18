"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Home } from "lucide-react";

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
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
