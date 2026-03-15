export type CommandHandler = (args: string) => void | Promise<void>;

export interface CommandDefinition {
  name: string;
  description: string;
  handler: CommandHandler;
}

export class CommandRegistry {
  private readonly commands = new Map<string, CommandDefinition>();

  register(name: string, description: string, handler: CommandHandler): void {
    if (this.commands.has(name)) {
      throw new Error(`Command already registered: ${name}`);
    }

    this.commands.set(name, {
      name,
      description,
      handler,
    });
  }

  get(name: string): CommandDefinition | undefined {
    return this.commands.get(name);
  }

  getAll(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  has(name: string): boolean {
    return this.commands.has(name);
  }
}

export function createCommandRegistry(): CommandRegistry {
  const registry = new CommandRegistry();

  registry.register("exit", "Exit Muggi-Sensei.", async () => {
    process.stdout.write("Goodbye!\n", () => {
      process.exit(0);
    });
  });

  return registry;
}
