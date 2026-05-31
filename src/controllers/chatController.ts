import type { Request, Response } from "express";
import {createSession,saveMessage,getSessionById, getSessionMessages,deleteSession} from "../services/sessionService.js";
import { generateAIResponse } from "../providers/openRouter.js";
import { personas } from "../personas/index.js";
import { ConversationMemory } from "../memory/conversationMemory.js";
import {sendMessageSchema} from "../validators/chatValidators.js";
import { updateSessionTitle } from "../services/sessionService.js";

export async function createChatSession(_req: Request,res: Response) {
  try {
    const session =await createSession();
    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        "Failed to create session",
    });
  }
}

export async function sendMessage(req:Request,res:Response){
    try{
        const validatedData=sendMessageSchema.parse(req.body);
        const {sessionId, message, persona, models} = validatedData;
        const selectedPersona=personas[persona as keyof typeof personas];
        if(!selectedPersona){
            return res.status(400).json({
                success:false,
                message:"Invalid persona selected",
            })
        }
        const session=await getSessionById(sessionId);
        if(!session!.title){
          const generatedTitle=message.split("").slice(0,4).join(" ")
          await updateSessionTitle(sessionId,generatedTitle)
        }
        const memory=new ConversationMemory();
        session!.messages.forEach((msg)=>{
          if(msg.role==="user" || msg.role==="assistant"){
            memory.addMessage(msg.role,msg.content);
          }
        })
        const responses=await Promise.all(
          models.map(async (modelId)=>({
            model:modelId,
            content:await generateAIResponse(
              modelId,
              selectedPersona.systemPrompt,
              memory,
              message)
          }))
        )
        await saveMessage(sessionId,"user",message);
        await saveMessage(sessionId,"assistant",JSON.stringify(responses));
        res.status(200).json({
            success:true,
            responses,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to send message",
        })
    }
}

export async function getChatSession(req:Request<{sessionId: string}>,res:Response){
  const { sessionId } = req.params;
  try{
    const session=await getSessionById(sessionId);
    if(!session){
      return res.status(404).json({
        success:false,
        message:"Session not found",
      })
    }
    let messages=session.messages.map((msg)=>({
      role:msg.role,
      content:msg.role==="user"?msg.content:undefined,
      responses:msg.role==="assistant"?JSON.parse(msg.content):undefined,
    }))
    res.status(200).json({
      success:true,
      messages,
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:"Failed to retrieve session",
    })
  }
}

export async function getSessions(_req:Request, res:Response){
  try{
    const sessions=await getSessionMessages();
    res.status(200).json({success:true,sessions})
  }catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Failed to fetch sessions"
    })
  }
}

export async function deleteChatSession(
  req: Request<{sessionId:string}>,
  res: Response
) {
  try {
    const { sessionId } = req.params;

    await deleteSession(sessionId);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete session",
    });
  }
}