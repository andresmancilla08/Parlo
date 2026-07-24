"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconFeather } from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { Sidebar } from "@/components/app/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const email = useAuth((s) => s.email);
  const hydrated = useAuth((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && !email) router.replace("/login");
  }, [hydrated, email, router]);

  if (!hydrated || !email) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <IconFeather className="size-8 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <AppBar />
        <main className="flex-1 pb-24 md:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
