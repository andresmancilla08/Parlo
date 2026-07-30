// Tortuga = «más despacio». Tabler no la trae, así que va dibujada aquí con
// el mismo trazo (24×24, stroke 2, currentColor) para que encaje con el resto.
export function IconTurtle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* caparazón */}
      <path d="M3.8 15.5a6.2 5.2 0 0 1 12.4 0" />
      <path d="M6.6 12.6h8.8M8.6 15.5v-2.9M13.4 15.5v-2.9" />
      {/* cabeza */}
      <path d="M16.2 14.4c.6-1 1.7-1.5 2.7-1.2 1 .3 1.4 1.4.9 2.3-.3.5-.8.8-1.4.9" />
      {/* patas y cola */}
      <path d="M6.4 15.5v2M14 15.5v2M3.8 15.5l-1.6 1.2" />
    </svg>
  );
}
