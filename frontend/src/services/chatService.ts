import axios from "axios";
import type {SendMessagePayload} from "../types/chat"

const API ="http://localhost:3000/api/chat";

export async function createSession() {
  const response = await axios.post(`${API}/session`);
  return response.data.session;
}

export async function sendMessage(payload:SendMessagePayload){
  const response=await axios.post(`${API}/message`,payload);
  return response.data.responses
}

export async function getSessions() {
  const response =await axios.get(`${API}/session`);
  return response.data.sessions;
}

export async function getSession(sessionId: string) {
  const response=await axios.get(`${API}/session/${sessionId}`);
  console.log("SESSION DETAILS:", response.data.session);
  return response.data.session;
}

export async function deleteSession(
  sessionId: string
) {
  await axios.delete(
    `${API}/sessions/${sessionId}`
  );
}