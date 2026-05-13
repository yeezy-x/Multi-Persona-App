import OpenAI from "openai";
import dotenv from "dotenv";
import { ConversationMemory } from "../memory/conversationMemory.js";
import { buildPrompt } from "../prompts/buildPrompt.js";
dotenv.config();

const client=new OpenAI({
  apiKey:process.env.OPENROUTER_API_KEY,
  baseURL:"https://openrouter.ai/api/v1",
});

export async function generateAIResponse(
    modelId: string,
    systemPrompt: string,
    memory: ConversationMemory,
    userPrompt: string
){
    const messages = buildPrompt(systemPrompt, memory.getMessages(), userPrompt);
    const response=await client.chat.completions.create({
        model: modelId,
        temperature: 0.7,
        messages
    })
    return response.choices[0].message.content || "";
}

export async function streamAIResponse(
    modelId: string,
    systemPrompt: string,
    memory: ConversationMemory,
    userPrompt: string,
    onChunk:(chunk: string) => void
){
    //prompt buildng ,memory, streaming provider
    const messages=buildPrompt(systemPrompt, memory.getMessages(), userPrompt);

    const stream=await client.chat.completions.create({
        model: modelId,
        messages,
        stream:true
    })
    for await (const chunk of stream){
        const content=chunk.choices[0].delta?.content;
        if(content){
            onChunk(content);
        }
    }
}