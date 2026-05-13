import axios from "axios";
import type {sendMessagePayload} from "../types/chat"

const API ="http://localhost:3000/api/chat";

export async function createSession() {
  const response = await axios.post(`${API}/session`);
  return response.data.session;
}

export async function streamMessage(payload: sendMessagePayload, onChunk: (chunk: string) => void) {
  const response=await fetch(`${API}/stream`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  if(!response.body){
    return;
  }
  const reader=response.body.getReader();
  const decoder=new TextDecoder();
  while(true){
    const {done,value}=await reader.read();
    if(done){
      break;
    }
    onChunk(decoder.decode(value));
  }
}

export async function getSessions() {
  const response =await axios.get(`${API}/session`);
  return response.data.sessions;
}

export async function getSession(sessionId: string) {
  const response=await axios.get(`${API}/session/${sessionId}`);
  return response.data.session;
}

export async function deleteSession(
  sessionId: string
) {
  await axios.delete(
    `${API}/sessions/${sessionId}`
  );
}