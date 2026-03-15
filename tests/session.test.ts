import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const readlineState = vi.hoisted(() => ({
  queuedInputs: [] as string[],
  closeHandler: undefined as (() => void) | undefined,
  createInterfaceMock: vi.fn(() => ({
    question: vi.fn(async () => {
      if (readlineState.queuedInputs.length === 0) {
        readlineState.closeHandler?.();
        throw new Error("readline closed");
      }

      return readlineState.queuedInputs.shift() ?? "";
    }),
    on: vi.fn((event: string, handler: () => void) => {
      if (event === "close") {
        readlineState.closeHandler = handler;
      }
    }),
  })),
}));

vi.mock("node:readline/promises", () => ({
  createInterface: readlineState.createInterfaceMock,
}));

import { runSession } from "../src/session.js";
import type { LlmProvider } from "../src/llm.js";

function createProvider(reply: string): LlmProvider {
  return {
    checkAvailability: vi.fn(async () => {}),
    sendMessage: vi.fn(async () => reply),
  };
}

beforeEach(() => {
  readlineState.queuedInputs = [];
  readlineState.closeHandler = undefined;
  readlineState.createInterfaceMock.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("runSession", () => {
  it("skips empty input", async () => {
    readlineState.queuedInputs = ["   ", "hello"];
    const provider = createProvider("reply");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await runSession(provider);

    expect(provider.sendMessage).toHaveBeenCalledTimes(1);
    expect(provider.sendMessage).toHaveBeenCalledWith([{ role: "user", content: "hello" }]);
    expect(logSpy).toHaveBeenCalledWith("reply");
  });

  it("dispatches slash commands", async () => {
    readlineState.queuedInputs = ["/help"];
    const provider = createProvider("reply");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await runSession(provider);

    expect(provider.sendMessage).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("/help  - Show available commands.");
    expect(logSpy).toHaveBeenCalledWith("/exit  - Exit Muggi-Sensei.");
  });

  it("prints an error for unknown commands", async () => {
    readlineState.queuedInputs = ["/foobar"];
    const provider = createProvider("reply");
    const errorSpy = vi
      .spyOn(process.stderr, "write")
      .mockImplementation((() => true) as typeof process.stderr.write);

    await runSession(provider);

    expect(provider.sendMessage).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      "Unknown command: /foobar. Type /help for available commands.\n",
    );
  });

  it("sends free text to the provider with conversation history", async () => {
    readlineState.queuedInputs = ["first question", "second question"];
    const provider: LlmProvider = {
      checkAvailability: vi.fn(async () => {}),
      sendMessage: vi
        .fn()
        .mockResolvedValueOnce("first reply")
        .mockResolvedValueOnce("second reply"),
    };
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await runSession(provider);

    expect(provider.sendMessage).toHaveBeenNthCalledWith(1, [
      { role: "user", content: "first question" },
    ]);
    expect(provider.sendMessage).toHaveBeenNthCalledWith(2, [
      { role: "user", content: "first question" },
      { role: "assistant", content: "first reply" },
      { role: "user", content: "second question" },
    ]);
    expect(logSpy).toHaveBeenCalledWith("first reply");
    expect(logSpy).toHaveBeenCalledWith("second reply");
  });
});
