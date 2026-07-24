import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <AuroraBackground className="grid min-h-dvh place-items-center px-5 py-12">
      <AuthForm mode="login" />
    </AuroraBackground>
  );
}
