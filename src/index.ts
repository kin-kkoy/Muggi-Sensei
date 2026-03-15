#!/usr/bin/env node

import { stderr } from "node:process";

import { createLlmProvider } from "./llm.js";
import { runSession } from "./session.js";

async function main(): Promise<void> {
  const llmProvider = createLlmProvider();

  await llmProvider.checkAvailability();
  await runSession(llmProvider);
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Muggi-Sensei failed to start.";

  stderr.write(`${message}\n`);
  process.exit(1);
});
