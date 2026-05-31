import {Router} from "express";
import { createChatSession, sendMessage, getChatSession,getSessions,deleteChatSession} from "../controllers/chatController.js";

const chatRoutes= Router();

chatRoutes.post("/session",createChatSession);
chatRoutes.post("/message",sendMessage);
chatRoutes.get("/session/:sessionId",getChatSession);
chatRoutes.get("/session",getSessions)
chatRoutes.delete("/sessions/:sessionId",deleteChatSession)

export default chatRoutes;


