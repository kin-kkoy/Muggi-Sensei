import { execFile, spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface LlmMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LlmProvider {
  checkAvailability(): Promise<void>;
  sendMessage(messages: LlmMessage[]): Promise<string>;
}

function buildMuggiTutorInstructions(): string {
  return [
    "You are Muggi-Sensei, a beginner-friendly coding tutor.",
    "Teach in a calm, clear, guided way.",
    "Do not assume advanced knowledge unless the user clearly shows it.",
    "Prefer simple explanations before technical depth.",
    "When explaining, break ideas into small steps.",
    "Avoid dumping a long answer when a guided explanation would help more.",
    "If you use code, keep it short and explain the important part.",
    "Reply in plain text only.",
    "Keep the response concise but clear.",
    "When it fits naturally, end with exactly one helpful next step:",
    "- offer a short example, or",
    "- offer a simple analogy, or",
    "- offer a tiny practice exercise.",
  ].join("\n");
}

function formatMessage(message: LlmMessage): string {
  const label = message.role === "user" ? "User" : "Assistant";

  return `${label}: ${message.content}`;
}

function buildPrompt(messages: LlmMessage[]): string {
  const conversation = messages.map(formatMessage).join("\n\n");

  return [
    "Tutor Instructions:",
    buildMuggiTutorInstructions(),
    "",
    "Response Goal:",
    "Use the conversation history for context and answer the latest user message directly.",
    "",
    "Conversation:",
    conversation,
  ].join("\n");
}

function buildCodexErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
    return "Codex CLI is not installed or not available on PATH.";
  }

  return "Codex backend is unavailable. Make sure Codex is installed, logged in, and able to reach the network.";
}

export class CodexExecProvider implements LlmProvider {
  async checkAvailability(): Promise<void> {
    try {
      await execFileAsync("codex", ["exec", "--help"], {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024,
      });
    } catch (error) {
      throw new Error(buildCodexErrorMessage(error));
    }
  }

  async sendMessage(messages: LlmMessage[]): Promise<string> {
    const prompt = buildPrompt(messages);
    const tempDirectory = await mkdtemp(join(tmpdir(), "muggi-codex-"));
    const outputFile = join(tempDirectory, "response.txt");

    try {
      await new Promise<void>((resolve, reject) => {
        const child = spawn(
          "codex",
          [
            "exec",
            "--color",
            "never",
            "--ephemeral",
            "--skip-git-repo-check",
            "--sandbox",
            "read-only",
            "--output-last-message",
            outputFile,
            "-",
          ],
          {
            cwd: process.cwd(),
            stdio: ["pipe", "pipe", "pipe"],
          },
        );

        let stderr = "";

        child.stdout.on("data", () => {
          // Drain stdout so Codex output does not block the child process.
        });

        child.stderr.on("data", (chunk: Buffer | string) => {
          stderr += chunk.toString();
        });

        child.on("error", (error) => {
          reject(error);
        });

        child.on("close", (code) => {
          if (code === 0) {
            resolve();
            return;
          }

          reject(new Error(stderr.trim() || `codex exec exited with code ${code ?? "unknown"}.`));
        });

        child.stdin.write(prompt);
        child.stdin.end();
      });

      const response = await readFile(outputFile, "utf8");

      return response.trim();
    } catch (error) {
      throw new Error(buildCodexErrorMessage(error));
    } finally {
      await rm(tempDirectory, { recursive: true, force: true });
    }
  }
}

export function createLlmProvider(): LlmProvider {
  return new CodexExecProvider();
}
