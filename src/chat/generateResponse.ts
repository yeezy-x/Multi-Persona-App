import { generateAIResponse } from "../providers/openRouter.js";
import type { ConversationMemory } from "../memory/conversationMemory.js";

export async function generateResponse(
  model: string,
  systemPrompt: string,
  memory: ConversationMemory,
  userPrompt: string
) {
  return generateAIResponse(
    model,
    systemPrompt,
    memory,
    userPrompt
  );
}

export async function generateMultipleResponses(
  models: string[],
  systemPrompt: string,
  memory: ConversationMemory,
  userPrompt: string
) {
  const results =
    await Promise.all(
      models.map(async (model) => ({
        model,
        content:
          await generateAIResponse(
            model,
            systemPrompt,
            memory,
            userPrompt
          ),
      }))
    );
  return results;
}

