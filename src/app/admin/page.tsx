"use client";

import { Navbar } from "@/components/layout/Navbar";
import { AdminEditor } from "@/components/admin/AdminEditor";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <AdminEditor />
      </main>
    </>
  );
}
