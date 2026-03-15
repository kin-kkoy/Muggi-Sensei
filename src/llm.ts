export interface LlmMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LlmAdapter {
  sendMessage(messages: LlmMessage[]): Promise<string>;
}

function findLastUserMessage(messages: LlmMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === "user") {
      return messages[index].content.trim();
    }
  }

  return "";
}

function findPreviousUserMessage(messages: LlmMessage[]): string {
  let seenCurrentUserMessage = false;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];

    if (message?.role !== "user") {
      continue;
    }

    if (!seenCurrentUserMessage) {
      seenCurrentUserMessage = true;
      continue;
    }

    return message.content.trim();
  }

  return "";
}

function isExampleRequest(message: string): boolean {
  const lowered = message.toLowerCase();

  return (
    lowered.includes("example") ||
    lowered.includes("show me") ||
    lowered.includes("how would") ||
    lowered.includes("can you give")
  );
}

function buildGenericResponse(userMessage: string): string {
  return [
    `You asked about: ${userMessage}`,
    "Start by breaking the problem into one small step you can explain in your own words.",
    "If you want, ask for an example or a simpler version next.",
  ].join("\n");
}

export class MockLlmAdapter implements LlmAdapter {
  async sendMessage(messages: LlmMessage[]): Promise<string> {
    const userMessage = findLastUserMessage(messages);
    const previousUserMessage = findPreviousUserMessage(messages);
    const lowered = userMessage.toLowerCase();

    if (userMessage === "") {
      return "No response received. Try again.";
    }

    if (lowered.includes("hello") || lowered.includes("hi")) {
      return [
        "Hello. I can help you think through coding questions.",
        "Ask a concept question, request an example, or describe a bug.",
      ].join("\n");
    }

    if (isExampleRequest(userMessage) && previousUserMessage !== "") {
      return [
        `Here is a simple example related to your earlier question about: ${previousUserMessage}`,
        "1. Start with a tiny input.",
        "2. Describe what the code should do.",
        "3. Trace the result one line at a time.",
      ].join("\n");
    }

    if (lowered.includes("what did i ask") && previousUserMessage !== "") {
      return `Earlier in this session, you asked: ${previousUserMessage}`;
    }

    if (previousUserMessage !== "" && (lowered.includes("follow up") || lowered.includes("why"))) {
      return [
        `This follow-up connects to your earlier question: ${previousUserMessage}`,
        "The key idea is to focus on what changes, what stays the same, and what the code should return.",
      ].join("\n");
    }

    return buildGenericResponse(userMessage);
  }
}

export function createLlmAdapter(): LlmAdapter {
  return new MockLlmAdapter();
}
