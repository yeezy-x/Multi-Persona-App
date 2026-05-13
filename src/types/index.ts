export type MessageRole= "user" | "assistant" | "system"; 

export type ChatMessage={
    role: MessageRole;
    content: string;
}

export type Persona={
    id: string,
    name: string,
    description: string,
    systemPrompt: string
}

export type Provider={
    id:string,
    name:string,
    generateResponse:(
        messages:ChatMessage[],
    )=> Promise<string>
}