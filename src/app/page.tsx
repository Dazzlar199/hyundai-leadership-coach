"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <section className="relative text-center container mx-auto py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 w-[36.125rem] h-[20rem] bg-gradient-radial from-blue-200/50 dark:from-white/10 to-transparent"
        />
      </div>
      <div className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-6">
          AI Leadership Coaching
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          데이터 기반 리더십 코칭으로<br />팀의 잠재력을 극대화하세요
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          AI 코치와 함께 당신의 리더십 스타일을 진단하고, 맞춤형 코칭과 실전 시나리오를 통해 최고의 리더로 성장하세요.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/scenarios">시나리오로 진단 시작하기</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
