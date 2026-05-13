export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type sendMessagePayload = {
  sessionId: string;
  message: string;
  model: string;
  persona: string;
};

export type Session={
  id:string,
  title:string | null,
  updatedAt:string
}