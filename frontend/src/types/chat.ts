export type AIResponse = {
  model: string;
  content: string;
};

export type Message = {
  role: "user" | "assistant";
  content?: string;
  responses?: AIResponse[];
};

export type SendMessagePayload = {
  sessionId: string;
  message: string;
  models: string[];
  persona: string;
};

export type Session = {
  id: string;
  title: string | null;
  updatedAt: string;
};