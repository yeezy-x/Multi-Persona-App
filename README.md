# Multi-Persona GenAI Platform

A full-stack AI application that enables users to interact with multiple Large Language Models (LLMs) through specialized AI personas in a modern real-time chat interface.

Built with a production-style architecture using:

- Next.js
- React
- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma
- OpenRouter

---

# Overview

This project provides a unified AI workspace where users can:

- switch between multiple AI models
- interact with specialized personas
- maintain persistent conversations
- stream AI responses in real time
- manage chat history
- render Markdown and code blocks beautifully

The platform is designed to mimic modern AI products such as ChatGPT and Claude while demonstrating scalable GenAI engineering patterns.

---

# Features

## Multi-Model AI Support

Interact with multiple foundation models from a single interface.

Currently supported:

- DeepSeek V3
- GPT-4.1 Mini
- Gemini Flash
- Llama 3.3

Powered through OpenRouter for unified model access.

---

## AI Personas

Dynamically change AI behavior using persona-based system prompts.

Examples:

- Backend Engineer
- Interviewer
- PostgreSQL Mentor
- Startup Advisor
- Fitness Coach

Each persona customizes:

- tone
- expertise
- response style
- communication behavior
- constraints

---

## Real-Time Streaming

Supports token streaming for responsive AI conversations.

Features:

- incremental response rendering
- smooth UX
- low-latency interaction
- streaming API architecture

---

## Persistent Chat Memory

Conversation history is stored using PostgreSQL + Prisma.

Capabilities:

- persistent sessions
- multi-turn memory
- chat restoration
- conversation switching
- session history sidebar

---

## Modern AI Chat UI

Built with Next.js + TailwindCSS.

Includes:

- responsive layout
- conversation sidebar
- dark mode UI
- Markdown rendering
- syntax-highlighted code blocks
- streaming message updates

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Axios
- React Markdown

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- OpenRouter SDK

---

# Architecture

## Backend Structure

```txt
src/
│
├── chat/
├── controllers/
├── memory/
├── models/
├── personas/
├── providers/
├── routes/
├── services/
├── validators/
└── server.ts
```

---

## Frontend Structure

```txt
frontend/src/
│
├── app/
├── components/
├── services/
├── lib/
├── hooks/
├── store/
└── types/
```

---

# Core Concepts Demonstrated

This project demonstrates practical GenAI engineering patterns including:

- LLM orchestration
- persona prompting
- conversation memory
- streaming AI responses
- backend/frontend separation
- session persistence
- scalable API architecture
- Markdown rendering pipelines
- real-time UI updates

---

# Database Schema

Core entities:

- ChatSession
- ChatMessage

Relationships managed using Prisma ORM with PostgreSQL.

---

# Environment Variables

## Backend `.env`

```env
DATABASE_URL=

OPENROUTER_API_KEY=
```

---

# Local Development

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Multi-Persona-App.git
```

---

## Backend Setup

```bash
npm install
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Features

## Chat Sessions

- create sessions
- fetch sessions
- delete sessions
- restore conversations

---

## AI Messaging

- streaming endpoint
- persona routing
- model routing
- persistent storage
- memory injection

---

# Future Improvements

Planned features:

- authentication
- vector memory
- semantic search
- RAG pipelines
- AI-generated chat titles
- multi-user support
- image generation
- voice support
- file uploads
- tool calling
- agent workflows

---

# Learning Goals

This project was built to deeply understand:

- production-grade GenAI architecture
- full-stack AI application development
- LLM integration patterns
- streaming systems
- memory management
- scalable AI UX design

---

# Screenshots

<img width="1913" height="1079" alt="image" src="https://github.com/user-attachments/assets/8926c595-930c-4490-8945-c9aafae8edcf" />


Examples:

- chat interface
- sidebar conversations
- streaming responses
- persona switching
- model switching

---

# License

MIT License

---

# Author

Built by Sudhir.

```
