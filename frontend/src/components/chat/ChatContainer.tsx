"use client";

import { useEffect, useState } from "react";

import type {
  Message,
  Session,
} from "@/types/chat";

import {
  createSession,
  sendMessage,
  getSession,
  getSessions,
  deleteSession,
} from "@/services/chatService";

import { models } from "@/lib/models";
import { personas } from "@/lib/personas";

import { Sidebar } from "../sidebar/Sidebar";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionId, setSessionId] =useState("");
  const [loading, setLoading] =useState(false);
  const [selectedModels,setSelectedModels] =
  useState<string[]>([
    "openai/gpt-4.1-mini",
    "google/gemini-2.5-flash-preview",
    "deepseek/deepseek-chat-v3",
  ]);

  const [selectedPersona, setSelectedPersona] =
    useState(personas[0]!.id);

  useEffect(() => {
    async function initialize() {
      const session = await createSession();
      setSessionId(session.id);

      const allSessions = await getSessions();
      setSessions(allSessions);
    }
    initialize();
  }, []);

  async function handleSendMessage(
    input: string
  ) {
    if (!input.trim() || !sessionId) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const responses=await sendMessage({
        sessionId,
        message:input,
        models:selectedModels,
        persona:selectedPersona
      })

      setMessages((prev)=>[
        ...prev,
        {
          role:"assistant",
          responses,
        }
      ])

      const updatedSessions = await getSessions();
      setSessions(updatedSessions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectSession(
    id: string
  ) {
    try {
      const session =await getSession(id);
      setSessionId(id);
      setMessages(
        session.messages
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNewChat() {
    const session =
      await createSession();

    setSessionId(session.id);

    setMessages([]);

    const updatedSessions =
      await getSessions();

    setSessions(updatedSessions);
  }

  async function handleDeleteSession(
    id: string
  ) {
    try {
      await deleteSession(id);

      const updatedSessions =
        await getSessions();

      setSessions(updatedSessions);

      if (id === sessionId) {
        setMessages([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      <Sidebar
        sessions={sessions}
        activeSessionId={sessionId}
        onSelect={handleSelectSession}
        onNewChat={handleNewChat}
        onDelete={handleDeleteSession}
        selectedModel={selectedModels}
        selectedPersona={selectedPersona}
        onModelChange={(value) => setSelectedModels(value as string[])}
        onPersonaChange={setSelectedPersona}
        models={models}
        personas={personas}
      />

      <section className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-2xl text-center">
                <h1 className="mb-4 text-5xl font-bold">
                  AI Fusion
                </h1>

                <p className="text-zinc-400">
                  Compare multiple AI
                  models side-by-side
                </p>
              </div>
            </div>
          ) : (
            <ChatMessages
              messages={messages}
              loading={loading}
            />
          )}
        </div>

        <div className="border-t border-zinc-800 bg-zinc-950 p-4">
          <ChatInput
            onSend={handleSendMessage}
          />
        </div>
      </section>
    </div>
  );
}