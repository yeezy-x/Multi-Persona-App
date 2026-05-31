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
  console.log("MODELS RECEIVED:", models);

  const results = await Promise.all(
    models.map(async (model) => {
      console.log("CALLING MODEL:", model);

      const content =
        await generateAIResponse(
          model,
          systemPrompt,
          memory,
          userPrompt
        );

      return {
        model,
        content,
      };
    })
  );

  return results;
}

