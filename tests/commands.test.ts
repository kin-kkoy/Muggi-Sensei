import { afterEach, describe, expect, it, vi } from "vitest";

import { CommandRegistry, createCommandRegistry } from "../src/commands.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CommandRegistry", () => {
  it("registers and retrieves commands", () => {
    const registry = new CommandRegistry();
    const handler = vi.fn();

    registry.register("test", "Test command.", handler);

    expect(registry.get("test")).toEqual({
      name: "test",
      description: "Test command.",
      handler,
    });
  });

  it("reports whether a command exists", () => {
    const registry = new CommandRegistry();

    registry.register("test", "Test command.", vi.fn());

    expect(registry.has("test")).toBe(true);
    expect(registry.has("missing")).toBe(false);
  });

  it("returns all registered commands", () => {
    const registry = new CommandRegistry();

    registry.register("one", "First command.", vi.fn());
    registry.register("two", "Second command.", vi.fn());

    expect(registry.getAll().map((command) => command.name)).toEqual(["one", "two"]);
  });

  it("prints /help output in the expected format", async () => {
    const registry = createCommandRegistry();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await registry.get("help")?.handler("");

    expect(logSpy).toHaveBeenNthCalledWith(1, "/help  - Show available commands.");
    expect(logSpy).toHaveBeenNthCalledWith(2, "/exit  - Exit Muggi-Sensei.");
  });

  it("prints a farewell and exits for /exit", async () => {
    const registry = createCommandRegistry();
    const writeSpy = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(((chunk: string | Uint8Array, callback?: () => void) => {
        callback?.();
        return true;
      }) as typeof process.stdout.write);
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: string | number | null) => {
      throw new Error(`exit:${code ?? ""}`);
    }) as typeof process.exit);

    await expect(registry.get("exit")?.handler("")).rejects.toThrow("exit:0");
    expect(writeSpy).toHaveBeenCalledWith("Goodbye!\n", expect.any(Function));
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
