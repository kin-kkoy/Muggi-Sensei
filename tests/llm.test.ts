import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockState = vi.hoisted(() => ({
  execFileMock: vi.fn(),
  spawnMock: vi.fn(),
  mkdtempMock: vi.fn(),
  readFileMock: vi.fn(),
  rmMock: vi.fn(),
}));

vi.mock("node:child_process", () => ({
  execFile: mockState.execFileMock,
  spawn: mockState.spawnMock,
}));

vi.mock("node:fs/promises", () => ({
  mkdtemp: mockState.mkdtempMock,
  readFile: mockState.readFileMock,
  rm: mockState.rmMock,
}));

vi.mock("node:util", () => ({
  promisify: (fn: unknown) => fn,
}));

import { CodexExecProvider } from "../src/llm.js";

function createSpawnProcess(exitCode = 0) {
  const handlers = new Map<string, Array<(value?: unknown) => void>>();

  return {
    stdout: {
      on: vi.fn((event: string, handler: (value?: unknown) => void) => {
        handlers.set(event, [...(handlers.get(event) ?? []), handler]);
      }),
    },
    stderr: {
      on: vi.fn((event: string, handler: (value?: unknown) => void) => {
        handlers.set(`stderr:${event}`, [...(handlers.get(`stderr:${event}`) ?? []), handler]);
      }),
    },
    stdin: {
      write: vi.fn(),
      end: vi.fn(),
    },
    on: vi.fn((event: string, handler: (value?: unknown) => void) => {
      handlers.set(`process:${event}`, [...(handlers.get(`process:${event}`) ?? []), handler]);
    }),
    finish() {
      for (const handler of handlers.get("process:close") ?? []) {
        handler(exitCode);
      }
    },
    fail(error: Error) {
      for (const handler of handlers.get("process:error") ?? []) {
        handler(error);
      }
    },
  };
}

beforeEach(() => {
  mockState.execFileMock.mockReset();
  mockState.spawnMock.mockReset();
  mockState.mkdtempMock.mockReset();
  mockState.readFileMock.mockReset();
  mockState.rmMock.mockReset();
  mockState.mkdtempMock.mockResolvedValue("/tmp/muggi-codex-test");
  mockState.rmMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CodexExecProvider", () => {
  it("returns the final response text on success", async () => {
    const child = createSpawnProcess(0);

    mockState.spawnMock.mockImplementation(() => {
      queueMicrotask(() => child.finish());
      return child;
    });
    mockState.readFileMock.mockResolvedValue("Tutor reply\n");

    const provider = new CodexExecProvider();
    const response = await provider.sendMessage([{ role: "user", content: "What is a closure?" }]);

    expect(response).toBe("Tutor reply");
    expect(mockState.spawnMock).toHaveBeenCalledWith(
      "codex",
      expect.arrayContaining(["exec", "--output-last-message", "/tmp/muggi-codex-test/response.txt", "-"]),
      expect.objectContaining({ cwd: process.cwd() }),
    );
    expect(child.stdin.write).toHaveBeenCalledWith(expect.stringContaining("Muggi-Sensei"));
    expect(child.stdin.end).toHaveBeenCalled();
  });

  it("rethrows availability failures with a user-friendly message", async () => {
    mockState.execFileMock.mockRejectedValue({ code: "ENOENT" });

    const provider = new CodexExecProvider();

    await expect(provider.checkAvailability()).rejects.toThrow(
      "Codex CLI is not installed or not available on PATH.",
    );
  });

  it("returns an empty string when Codex writes no final message", async () => {
    const child = createSpawnProcess(0);

    mockState.spawnMock.mockImplementation(() => {
      queueMicrotask(() => child.finish());
      return child;
    });
    mockState.readFileMock.mockResolvedValue("");

    const provider = new CodexExecProvider();
    const response = await provider.sendMessage([{ role: "user", content: "hello" }]);

    expect(response).toBe("");
  });

  it("rethrows request failures with a user-friendly message", async () => {
    const child = createSpawnProcess(1);

    mockState.spawnMock.mockImplementation(() => {
      queueMicrotask(() => child.finish());
      return child;
    });

    const provider = new CodexExecProvider();

    await expect(provider.sendMessage([{ role: "user", content: "hello" }])).rejects.toThrow(
      "Codex backend is unavailable. Make sure Codex is installed, logged in, and able to reach the network.",
    );
  });
});
