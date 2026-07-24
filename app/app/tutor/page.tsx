"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconFeather, IconSend2 } from "@tabler/icons-react";
import { Mascot } from "@/components/ui/mascot";
import { cn } from "@/lib/utils";

export default function TutorPage() {
  const { t } = useTranslation();
  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/tutor" }),
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-6">
      <header className="mb-4 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-fg shadow-md shadow-primary/25">
          <IconFeather className="size-6" />
        </span>
        <div>
          <h1 className="font-display text-lg font-extrabold leading-tight">
            {t("tutor.title")}
          </h1>
          <p className="text-xs text-muted">{t("tutor.subtitle")}</p>
        </div>
      </header>

      <div className="flex-1 space-y-3">
        {messages.length === 0 && (
          <EmptyState onPick={send} />
        )}

        {messages.map((m) => (
          <Bubble key={m.id} role={m.role}>
            {m.parts.map((p, i) =>
              p.type === "text" ? <span key={i}>{p.text}</span> : null,
            )}
          </Bubble>
        ))}

        {status === "submitted" && <Typing />}

        {error && (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-danger/30 bg-danger/10 p-5 text-center">
            <p className="text-sm font-medium text-danger">{t("tutor.error")}</p>
            <button
              onClick={() => regenerate()}
              className="rounded-pill border border-border bg-surface px-5 py-2 text-sm font-bold text-fg transition-colors hover:border-primary"
            >
              {t("tutor.retry")}
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-24 z-30 mt-4 pb-2 md:bottom-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 rounded-3xl border border-border bg-card p-2 shadow-lg shadow-black/5"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder={t("tutor.placeholder")}
            className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2 text-fg outline-none placeholder:text-muted/60"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || busy}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-fg transition-opacity",
              (!input.trim() || busy) && "opacity-40",
            )}
            aria-label={t("a11y.send")}
          >
            <IconSend2 className="size-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  const { t } = useTranslation();
  const starters = t("tutor.starters", { returnObjects: true }) as string[];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="rounded-3xl border border-border bg-card p-6 text-center"
    >
      <div className="mb-1 flex justify-center">
        <Mascot height={116} />
      </div>
      <h2 className="mt-2 font-display text-lg font-bold">
        {t("tutor.empty_title")}
      </h2>
      <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
        {t("tutor.empty_body")}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        {starters.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="rounded-2xl border border-border bg-surface px-4 py-2.5 text-left text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Bubble({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-br-lg bg-primary text-primary-fg"
            : "rounded-bl-lg border border-border bg-card text-fg",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 rounded-3xl rounded-bl-lg border border-border bg-card px-4 py-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-muted"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
