import { ConversationMemory } from "../memory/conversationMemory";
import { streamAIResponse } from "../providers/openRouter.js";
export async function generateStreamingResponse(
  model: string,
  systemPrompt: string,
  memory: ConversationMemory,
  userPrompt: string,
  onChunk: (chunk: string) => void
){
    return await streamAIResponse(model, systemPrompt, memory, userPrompt, onChunk)
}
