import {z} from "zod"

export const sendMessageSchema=z.object({
    sessionId:z.string(),
    message:z.string(),
    persona:z.string(),
    models:z.array(z.string()).min(1)
})