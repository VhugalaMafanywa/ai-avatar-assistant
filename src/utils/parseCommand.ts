// src/utils/parseCommand.ts
export interface ParsedCommand {
  animation: string;
  explanation: string;
}

export function parseCommand(text: string): ParsedCommand {
  const lower = text.toLowerCase().trim();

  if (lower.includes("wave") || lower.includes("hello")) {
    return { animation: "wave", explanation: "Waving hello 👋" };
  }
  if (lower.includes("walk") || lower.includes("move")) {
    return { animation: "walking", explanation: "Walking around" };
  }
  if (lower.includes("point")) {
    return { animation: "pointing", explanation: "Pointing at something" };
  }
  if (lower.includes("dance")) {
    return { animation: "dancing", explanation: "Dancing!" };
  }

  // Default
  return {
    animation: "idle",
    explanation: `I don't understand "${text}". Try: wave, walk, point, dance...`
  };
}