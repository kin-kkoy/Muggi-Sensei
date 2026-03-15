import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output, stderr as errorOutput } from "node:process";

import { createCommandRegistry } from "./commands.js";
import { createLlmAdapter, type LlmAdapter, type LlmMessage } from "./llm.js";
import type { Session } from "./types.js";

function buildMessages(session: Session, userMessage: string): LlmMessage[] {
  const messages: LlmMessage[] = [];

  for (const exchange of session.exchanges) {
    messages.push({ role: "user", content: exchange.userMessage });
    messages.push({ role: "assistant", content: exchange.assistantMessage });
  }

  messages.push({ role: "user", content: userMessage });

  return messages;
}

function parseCommand(inputText: string): { name: string; args: string } {
  const commandText = inputText.slice(1).trim();
  const firstSpaceIndex = commandText.indexOf(" ");

  if (firstSpaceIndex === -1) {
    return { name: commandText, args: "" };
  }

  return {
    name: commandText.slice(0, firstSpaceIndex),
    args: commandText.slice(firstSpaceIndex + 1).trim(),
  };
}

export async function runSession(llmAdapter: LlmAdapter = createLlmAdapter()): Promise<void> {
  const session: Session = {
    exchanges: [],
    startedAt: new Date(),
  };

  const commandRegistry = createCommandRegistry();
  const readline = createInterface({ input, output });

  let closed = false;

  readline.on("close", () => {
    closed = true;
  });

  console.log("Welcome to Muggi-Sensei! Type /help for commands.");

  while (!closed) {
    let userInput: string;

    try {
      userInput = await readline.question("muggi> ");
    } catch {
      break;
    }

    const trimmedInput = userInput.trim();

    if (trimmedInput === "") {
      continue;
    }

    if (trimmedInput.startsWith("/")) {
      const command = parseCommand(trimmedInput);
      const registeredCommand = commandRegistry.get(command.name);

      if (registeredCommand) {
        await registeredCommand.handler(command.args);
      }

      continue;
    }

    try {
      const messages = buildMessages(session, trimmedInput);
      const assistantMessage = await llmAdapter.sendMessage(messages);

      if (assistantMessage === "") {
        console.log("No response received. Try again.");
        continue;
      }

      console.log(assistantMessage);

      session.exchanges.push({
        userMessage: trimmedInput,
        assistantMessage,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to reach the LLM right now. Please try again.";

      errorOutput.write(`${message}\n`);
    }
  }

  console.log("Goodbye!");
}
