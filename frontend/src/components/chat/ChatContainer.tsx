"use client";

import { useEffect, useState } from "react";

import type {
  Message,
  Session,
} from "@/types/chat";

import {
  createSession,
  getSession,
  getSessions,
  streamMessage,
  deleteSession
} from "@/services/chatService";

import { models } from "@/lib/models";
import { personas } from "@/lib/personas";

import { Sidebar } from "../sidebar/Sidebar";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

import { ModelSelector } from "../selectors/ModelSelector";
import { PersonaSelector } from "../selectors/PersonaSelector";

export function ChatContainer() {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [sessionId, setSessionId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [selectedModel, setSelectedModel] =
    useState(models[0]!.id);

  const [selectedPersona, setSelectedPersona] =
    useState(personas[0]!.id);

  useEffect(() => {
    async function initialize() {
      const session =
        await createSession();

      setSessionId(session.id);

      const allSessions =
        await getSessions();

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

    let streamedText = "";

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    try {
      await streamMessage(
        {
          sessionId,
          model: selectedModel,
          persona: selectedPersona,
          message: input,
        },
        (chunk) => {
          streamedText += chunk;

          setMessages((prev) => {
            const updated = [...prev];

            updated[
              updated.length - 1
            ] = {
              role: "assistant",
              content: streamedText,
            };

            return updated;
          });
        }
      );

      const updatedSessions =
        await getSessions();

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
      const session =
        await getSession(id);

      setSessionId(id);

      setMessages(
        session.messages.map(
          (message: any) => ({
            role: message.role,
            content:
              message.content,
          })
        )
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

  async function handleDeleteSession(id:string){
    try{
      await deleteSession(id);
      const updatedSessions=await getSessions();
      setSessions(updatedSessions);
      if(id==sessionId){
        setMessages([])
      }
    }catch(error){
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
      />

      <section className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-6 py-4">
          <ModelSelector
            value={selectedModel}
            onChange={setSelectedModel}
            options={models}
          />

          <PersonaSelector
            value={selectedPersona}
            onChange={setSelectedPersona}
            options={personas}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatMessages
            messages={messages}
            loading={loading}
          />
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