export interface Exchange {
  userMessage: string;
  assistantMessage: string;
}

export interface Session {
  exchanges: Exchange[];
  startedAt: Date;
}
