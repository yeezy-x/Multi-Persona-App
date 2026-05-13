import readline from "readline";

import { models } from "./models/index.js";
import { personas } from "./personas/index.js";

import { generateResponse } from "./chat/generateResponse.js";

import { ConversationMemory } from "./memory/conversationMemory.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(
  question: string
): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function selectModel() {
  console.log("\n=== Available Models ===\n");
  models.forEach((model, index) => {
    console.log(`${index + 1}. ${model.name}`);
  });
  const choice = await askQuestion( "\nSelect model: ");
  return (models[Number(choice) - 1] || models[0]);
}

async function selectPersona() {
  console.log("\n=== Available Personas ===\n");
  const personaList=Object.values(personas);
  personaList.forEach(
    (persona, index) => {
      console.log(
        `${index + 1}.${persona.name}`
      );
    }
  );
  const choice = await askQuestion("\nSelect persona: ");
  return (personaList[Number(choice) - 1] || personaList[0]);
}

async function chatLoop(
    model: {id: string;name: string;},
    systemPrompt: string
  ){
    const memory =new ConversationMemory();
    while (true) {
      const userInput=await askQuestion("\nYou: ");
      if (!userInput) continue;
      const command = userInput.toLowerCase();
      if(command==="exit") {
        console.log("\nGoodbye!\n");
        rl.close();
        process.exit(0);
      }
      if (command==="clear") {
        memory.clear();
        console.log(
          "\nConversation cleared.\n"
        );
        continue;
      }
      if (command === "models") {
        console.log("\n=== Available Models ===\n");
        models.forEach(
          (model, index) => {
            console.log(
              `${index + 1}. ${model.name}`
            );
          }
        );
        continue;
      }
    if (command === "personas") {
      console.log("\n=== Available Personas ===\n");
      Object.values(personas)
        .forEach(
          (persona, index) => {
            console.log(
              `${index + 1}. ${persona.name}`
            );
          }
        );
      continue;
    }

    console.log("\nThinking...\n");
    try {
      const response =await generateResponse(
          model.id,
          systemPrompt,
          memory,
          userInput
        );

      memory.addMessage("user",userInput);

      memory.addMessage("assistant",response || "");

      console.log(
        `AI:\n${response}\n`
      );

    } catch (error: any) {

      console.error("\nAI Error:");

      if (error?.error?.message) {

        console.error(
          error.error.message
        );

      } else if (error?.message) {

        console.error(error.message);

      } else {

        console.error(
          "Unknown error occurred."
        );
      }
    }
  }
}

async function main() {

  console.log("\n=== GenAI CLI ===");

  const selectedModel =
    await selectModel();

  const selectedPersona =
    await selectPersona();

  console.log(`
====================================
Model   → ${selectedModel.name}
Persona → ${selectedPersona.name}
====================================
`);

  await chatLoop(
    selectedModel,
    selectedPersona.systemPrompt
  );
}

main();