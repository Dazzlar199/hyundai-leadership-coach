"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="relative text-center container mx-auto py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff89] to-[#0055ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-6">
          AI Leadership Coaching
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl dark:[text-shadow:0_0_10px_rgba(255,255,255,0.7)]">
          데이터 기반 리더십 코칭으로<br />팀의 잠재력을 극대화하세요
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground dark:[text-shadow:0_0_10px_rgba(255,255,255,0.5)]">
          AI 코치와 함께 당신의 리더십 스타일을 진단하고, 맞춤형 코칭과 실전 시나리오를 통해 최고의 리더로 성장하세요.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/scenarios">시나리오로 진단 시작하기</Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 relative">
        <div
          aria-hidden="true"
          className="hidden dark:block absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[15rem] bg-gradient-radial from-blue-500/30 to-transparent"
          />
        </div>
        <Image
          src="/images/todo.png"
          alt="To-do list"
          width={600}
          height={400}
          className="mx-auto rounded-lg shadow-lg"
        />
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
