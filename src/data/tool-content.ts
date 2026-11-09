import { TOOL_CONTENT_A1 } from "./tool-content-a1";
import { TOOL_CONTENT_A2 } from "./tool-content-a2";
import { TOOL_CONTENT_A3 } from "./tool-content-a3";
import { TOOL_CONTENT_B1 } from "./tool-content-b1";
import { TOOL_CONTENT_B2 } from "./tool-content-b2";
import { TOOL_CONTENT_B3 } from "./tool-content-b3";

export interface ToolContentEntry {
  quickAnswer: string;
  howItWorks: string[];
  formula?: string;
  example: { title: string; body: string };
  faqs: { question: string; answer: string }[];
}

export const TOOL_CONTENT: Record<string, ToolContentEntry> = {
  ...TOOL_CONTENT_A1,
  ...TOOL_CONTENT_A2,
  ...TOOL_CONTENT_A3,
  ...TOOL_CONTENT_B1,
  ...TOOL_CONTENT_B2,
  ...TOOL_CONTENT_B3,
};
