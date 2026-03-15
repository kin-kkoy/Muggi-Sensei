#!/usr/bin/env node

import { stderr } from "node:process";

import { runSession } from "./session.js";

async function main(): Promise<void> {
  await runSession();
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Muggi-Sensei failed to start.";

  stderr.write(`${message}\n`);
  process.exit(1);
});
