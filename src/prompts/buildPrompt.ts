import type {
  ChatMessage,
} from "../types/index.js";

export function buildPrompt(systemPrompt: string, conversationHistory: ChatMessage[], currentUserMessage: string): ChatMessage[] {
  const systemMessage:ChatMessage = {
    role: "system",
    content:systemPrompt,
  };

  const userMessage:ChatMessage = {
    role: "user",
    content:currentUserMessage,
  };

  return [
    systemMessage,
    ...conversationHistory,
    userMessage,
  ];
}