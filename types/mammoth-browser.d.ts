// mammoth publica el build de navegador sin tipos (los suyos apuntan al de
// Node, que arrastra `fs`). Se declara aquí lo único que usa el lector.
declare module "mammoth/mammoth.browser" {
  export function extractRawText(input: {
    arrayBuffer: ArrayBuffer;
  }): Promise<{ value: string; messages: unknown[] }>;
}
