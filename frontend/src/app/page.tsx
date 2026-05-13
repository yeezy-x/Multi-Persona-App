"use client";

import { ChatContainer } from "../components/chat/ChatContainer";
import { Sidebar } from "../components/sidebar/Sidebar";

export default function HomePage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white">
      <ChatContainer />
    </main>
  );
}
