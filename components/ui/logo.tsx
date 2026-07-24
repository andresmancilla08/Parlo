import Image from "next/image";
import logo from "@/public/brand/logo.png";
import { cn } from "@/lib/utils";

const RATIO = logo.width / logo.height;

/** Logo de Parlo (wordmark + loro). Transparente, sirve en claro y oscuro. */
export function Logo({
  height = 32,
  priority = false,
  className,
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt="Parlo"
      height={height}
      width={Math.round(height * RATIO)}
      priority={priority}
      draggable={false}
      unoptimized
      className={cn("select-none", className)}
    />
  );
}
