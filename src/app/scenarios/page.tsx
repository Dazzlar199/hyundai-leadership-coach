"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ScenarioForm } from "@/components/scenarios/ScenarioForm";
import { ScenarioPreview } from "@/components/scenarios/ScenarioPreview";
import { useScenarioStore } from "@/stores/useScenarioStore";
import { useEffect } from "react";

export default function ScenariosPage() {
  const { scenario, reset } = useScenarioStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        {scenario ? (
          <ScenarioPreview scenario={scenario} onReset={reset} />
        ) : (
          <ScenarioForm />
        )}
      </main>
    </>
  );
}
