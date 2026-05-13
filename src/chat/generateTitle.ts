import { generateAIResponse } from "../providers/openRouter";

export async function generateTitle(message:string){
    const prompt = `Generate a very shortconversation titlefor this message.
    Rules:
    - max 5 words
    - no quotes
    - concise
    - professional
    Message:${message}`;

    const response=await generateAIResponse("deepseek/deepseek-chat-v3",prompt,null as any,message);
    return response.trim().replace(/"/g,"");
}