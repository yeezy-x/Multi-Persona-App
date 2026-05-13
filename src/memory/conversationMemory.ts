import type {ChatMessage, MessageRole} from "../types/index.js"

export class ConversationMemory {
    private messages: ChatMessage[]=[];
    addMessage(role:MessageRole, content: string){
        this.messages.push({ role, content });
    }
    
    getMessages(){
        return this.messages;
    }
    clear(){
        this.messages = [];
    }
}