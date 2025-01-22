// Centralize type definitions
export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
}

export interface AttachmentFile {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnail?: string;
  name: string;
  size: number;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  reactions?: string[];
} 