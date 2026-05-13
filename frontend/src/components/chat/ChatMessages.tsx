import type { Message } from "@/types/chat";

import { MarkdownRenderer } from "./MarkdownRenderer";

type Props = {
  messages: Message[];
  loading: boolean;
};

export function ChatMessages({
  messages,
  loading,
}: Props) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-black px-6 py-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-2xl px-5 py-4 ${
              message.role === "user"
                ? "ml-auto max-w-[80%] bg-white text-black"
                : "max-w-full bg-zinc-900 text-zinc-100"
            }`}
          >
            <MarkdownRenderer
              content={message.content}
            />
          </div>
        ))}

        {loading && (
          <div className="text-sm text-zinc-500">
            Thinking...
          </div>
        )}
      </div>
    </div>
  );
}