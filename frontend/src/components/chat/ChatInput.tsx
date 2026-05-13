"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export function ChatInput({
  onSend,
}: Props) {
  const [input, setInput] =
    useState("");

  function handleSubmit() {
    if (!input.trim()) {
      return;
    }

    onSend(input);

    setInput("");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Send a message..."
        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
      />

      <button
        onClick={handleSubmit}
        className="rounded-xl bg-blue-600 px-6 py-4 font-medium text-white transition hover:bg-blue-500"
      >
        Send
      </button>
    </div>
  );
}