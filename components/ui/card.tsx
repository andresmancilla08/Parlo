import { cn } from "@/lib/utils";

/** Superficie base reutilizable. El padding lo decide quien la usa. */
export function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
