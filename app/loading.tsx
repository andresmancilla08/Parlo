import { IconFeather } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <IconFeather className="size-8 animate-pulse text-primary" />
    </div>
  );
}
