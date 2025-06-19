export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'code' | 'action';
  hasCode?: boolean;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  context: string[];
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  isGuest: boolean;
  createdAt: Date;
  uploadCount: number;
  lastUploadReset: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  uploadedAt: Date;
}

export type ThemeMode = 'light' | 'dark';

export type PersonalityMode = 'professional' | 'casual' | 'motivational' | 'funny';

export type AnimationMode = 'particles' | 'waves' | 'geometric' | 'minimal' | 'cosmic';

export interface Settings {
  theme: ThemeMode;
  personality: PersonalityMode;
  voiceEnabled: boolean;
  soundEnabled: boolean;
  animationMode: AnimationMode;
}

export interface AnimationSettings {
  particles: boolean;
  transitions: boolean;
  autoScroll: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}