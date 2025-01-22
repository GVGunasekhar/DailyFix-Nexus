export type Platform = 'WhatsApp' | 'Slack' | 'Matrix' | 'Email' | 'iMessage';
export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface Contact {
  id: string;
  name: string;
  preferences?: {
    responseStyle?: string;
    preferredPlatform?: Platform;
    availableHours?: string;
    priorityLevel?: PriorityLevel;
    autoReplyEnabled?: boolean;
  };
  contextualNotes?: string;
  tags?: string[];
  lastInteraction?: Date;
}

export interface Message {
  id: string;
  text: string;
  platform: Platform;
  time: Date;
  isAIGenerated?: boolean;
  suggestedReplies?: string[];
  priority?: PriorityLevel;
  tags?: string[];
  summary?: string;
}

export interface DailySummary {
  date: Date;
  highlights: string[];
  priorityMessages: Message[];
  tasks: {
    text: string;
    completed: boolean;
    priority: PriorityLevel;
  }[];
  platforms: Record<Platform, number>; // Message count per platform
}

export interface Conversation {
  id: string;
  contact: Contact;
  lastMessage: string;
  platforms: Platform[];
  unreadCount: number;
  priority: PriorityLevel;
  messages: Message[];
  aiSuggestions: string[];
  contextualTags: string[];
  lastInteraction: Date;
  summary?: string;
  platformMessages: PlatformMessage[];
  dailySummaries?: DailySummary[];
  voiceCommands?: {
    enabled: boolean;
    customCommands?: Record<string, string>;
  };
  matrixRoomIds?: string[]; // For Matrix.org integration
  workflowTriggers?: {
    pattern: string;
    action: string;
  }[];
}

export interface PlatformMessage {
  platform: Platform;
  messages: string[];
  isFromSender: boolean;
  lastActivity: Date;
  priority?: PriorityLevel;
  aiProcessed?: boolean;
  contextualTags?: string[];
} 