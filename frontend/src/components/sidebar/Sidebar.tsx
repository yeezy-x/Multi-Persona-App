"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import type { Dispatch, SetStateAction } from 'react';
import type { Session } from "@/types/chat";

type Props = {
  sessions: Session[];
  activeSessionId: string;

  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;

  selectedModels: string[];
  selectedPersona: string;

  onModelChange: (models:string[]) => void;
  onPersonaChange: (value: string) => void;

  models: {
    id: string;
    name: string;
  }[];

  personas: {
    id: string;
    name: string;
  }[];
};

export function Sidebar({
  sessions,
  activeSessionId,
  onSelect,
  onNewChat,
  onDelete,

  selectedModels,
  selectedPersona,

  onModelChange,
  onPersonaChange,

  models,
  personas,
}: Props) {
  const { user, logout } =useAuth();

  return (
    <aside className="
      flex
      h-screen
      w-80
      flex-col
      border-r
      border-zinc-800
      bg-zinc-950
    ">
      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        border-b
        border-zinc-800
        p-4
      ">
        <h1 className="
          text-2xl
          font-bold
          text-white
        ">
          AI Fusion
        </h1>

        <button
          className="
            rounded-lg
            border
            border-zinc-700
            p-2
          "
        >
          🌙
        </button>
      </div>

      {/* NEW CHAT */}

      <div className="p-4">
        <button
          onClick={onNewChat}
          className="
            w-full
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
      </div>

      {/* CHAT LIST */}

      <div className="
        flex-1
        overflow-y-auto
        border-t
        border-zinc-800
      ">
        <p className="
          px-4
          py-4
          text-sm
          text-zinc-400
        ">
          Recent Conversations
        </p>

        <div className="
          space-y-2
          px-3
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

                ${
                  activeSessionId ===
                  session.id
                    ? "bg-zinc-800"
                    : "bg-zinc-900 hover:bg-zinc-800"
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
                  text-white
                "
              >
                {session.title ||
                  "Untitled Chat"}
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
      </div>

      {/* MODEL + PERSONA */}

      <div
        className="
          border-t
          border-zinc-800
          p-4
          space-y-5
        "
      >
        <div>
          <p
            className="
              mb-3
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            ">
            Models
          </p>

          <div className="space-y-2">
            {models.map((model) => {
              const isSelected=selectedModels.includes(model.id);

              return (
                <button
                  key={model.id}
                  onClick={() => {
                    if (isSelected) {
                      onModelChange(
                        selectedModels.filter(
                          (id) =>
                            id !== model.id
                        )
                      );
                    } else {
                      onModelChange([
                        ...selectedModels,
                        model.id,
                      ]);
                    }
                  }}
                  className={`
                    w-full
                    rounded-xl
                    border
                    p-3
                    text-left
                    transition

                    ${
                      isSelected
                        ? `
                          border-blue-500
                          bg-blue-500/10
                        `
                        : `
                          border-zinc-800
                          bg-zinc-900
                          hover:border-zinc-700
                        `
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {model.name}
                    </span>

                    <div
                      className={`
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border

                        ${
                          isSelected
                            ? `
                              border-blue-500
                              bg-blue-500
                            `
                            : `
                              border-zinc-600
                            `
                        }
                      `}
                    >
                      {isSelected && "✓"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p
            className="
              mb-2
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            Persona
          </p>

          <select
            value={selectedPersona}
            onChange={(e) =>
              onPersonaChange(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-3
              py-3
              text-white
            "
          >
            {personas.map((persona) => (
              <option
                key={persona.id}
                value={persona.id}
              >
                {persona.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FOOTER */}

      <div className="
        border-t
        border-zinc-800
        p-4
      ">
        {!user ? (
          <div className="
            flex
            gap-2
          ">
            <Link
              href="/signin"
              className="
                flex-1
                rounded-lg
                bg-blue-600
                py-2
                text-center
              "
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="
                flex-1
                rounded-lg
                border
                border-zinc-700
                py-2
                text-center
              "
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="
            space-y-2
          ">
            <p className="
              text-sm
              text-zinc-400
            ">
              {user.name}
            </p>

            <button
              onClick={logout}
              className="
                w-full
                rounded-lg
                border
                border-red-500
                py-2
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}