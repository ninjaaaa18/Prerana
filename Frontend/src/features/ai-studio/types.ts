import type { LucideIcon } from 'lucide-react';

export type AIModeId = 'assistant' | 'tutor' | 'doubts';

export interface AIMode {
  id: AIModeId;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  suggestion: string;
}

export type MessageRole = 'user' | 'assistant';

export type MessageStatus = 'sending' | 'streaming' | 'complete';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status: MessageStatus;
}

export interface ChatSession {
  id: string;
  title: string;
  subject: string;
  modeId: AIModeId;
  isPinned: boolean;
  preview: string;
  updatedAt: string;
  messageCount: number;
  messages: ChatMessage[];
}

export interface PromptSuggestion {
  id: string;
  label: string;
  prompt: string;
}

export type ResourceType =
  | 'mind-map'
  | 'flashcards'
  | 'slides'
  | 'infographic'
  | 'audio-overview'
  | 'data-table'
  | 'flow-diagram';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  icon: LucideIcon;
  color: string;
  fileType: string;
  size: string;
}
