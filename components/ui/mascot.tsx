import Image from "next/image";
import mascot from "@/public/brand/mascot.png";
import { cn } from "@/lib/utils";

const RATIO = mascot.width / mascot.height;

/**
 * Loro mascota de Parlo (estática). `glow` pinta un halo detrás.
 * `height` fija la relación de aspecto; usa `imgClassName` (ej. h-[200px] w-auto sm:h-[320px])
 * para tamaños responsive.
 */
export function Mascot({
  height = 160,
  glow = false,
  priority = false,
  className,
  imgClassName,
}: {
  height?: number;
  glow?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
          style={{ width: height, height }}
        />
      )}
      <Image
        src={mascot}
        alt="Parlo"
        height={height}
        width={Math.round(height * RATIO)}
        priority={priority}
        draggable={false}
        className={cn("select-none", imgClassName)}
      />
    </div>
  );
}
