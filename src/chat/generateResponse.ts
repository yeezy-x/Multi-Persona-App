import { generateAIResponse } from "../providers/openRouter.js";
import type { ConversationMemory } from "../memory/conversationMemory.js";
export async function generateResponse(
  model: string,
  systemPrompt: string,
  memory: ConversationMemory,
  userPrompt: string
) {
  return await generateAIResponse(
    model,
    systemPrompt,
    memory,
    userPrompt
  );
}