"use client";

import type { Session }
from "@/types/chat";

type Props = {

  sessions: Session[];

  activeSessionId: string;

  onSelect:
    (id: string) => void;

  onNewChat:
    () => void;

  onDelete:
    (id: string) => void;
};

export function Sidebar({

  sessions,

  activeSessionId,

  onSelect,

  onNewChat,

  onDelete,

}: Props) {

  return (

    <aside className="
      flex
      h-screen
      w-70
      flex-col
      border-r
      border-zinc-800
      bg-zinc-950
      p-4
    ">

      <button

        onClick={onNewChat}

        className="
          mb-4
          rounded-xl
          bg-white
          px-4
          py-3
          font-semibold
          text-black
          transition
          hover:bg-zinc-200
        "
      >

        + New Chat

      </button>

      <p className="
        mb-3
        text-sm
        text-zinc-400
      ">

        Conversations

      </p>

      <div className="
        flex-1
        space-y-2
        overflow-y-auto
      ">

        {sessions.map((session) => (

          <div

            key={session.id}

            className={`
              group
              flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2
              transition

              ${
                activeSessionId ===
                session.id

                  ? "bg-zinc-800"

                  : `
                    bg-zinc-900
                    hover:bg-zinc-800
                  `
              }
            `}
          >

            <button

              onClick={() =>
                onSelect(session.id)
              }

              className="
                flex-1
                truncate
                text-left
                text-sm
                text-zinc-200
              "
            >

              {
                session.title ||
                "Untitled Chat"
              }

            </button>

            <button

              onClick={() =>
                onDelete(session.id)
              }

              className="
                opacity-0
                transition
                group-hover:opacity-100
              "
            >

              🗑️

            </button>

          </div>
        ))}

      </div>

    </aside>
  );
}