"use client";

import type { Message } from "@/types/chat";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { modelMap } from "@/lib/modelMap";

type Props = {
  messages: Message[];
  loading: boolean;
};

export function ChatMessages({messages,loading}: Props) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-black px-6 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? (
              <div className="ml-auto max-w-[80%] rounded-2xl bg-white px-5 py-4 text-black">
                <MarkdownRenderer
                  content={message.content ?? ""}
                />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {message.responses?.map(
                  (response) => (
                    <div
                      key={response.model}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                    >
                      <div className="mb-3 border-b border-zinc-800 pb-2">
                        <h3 className="font-semibold">
                          {response.model}
                        </h3>
                      </div>

                      <MarkdownRenderer
                        content={
                          response.content
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-zinc-500">
            Generating responses...
          </div>
        )}
      </div>
    </div>
  );
}