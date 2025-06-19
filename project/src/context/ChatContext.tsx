import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, Message } from '../types';

interface ChatContextType {
  state: ChatState;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (isTyping: boolean) => void;
  clearChat: () => void;
  loadMessages: (messages: Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Omit<Message, 'id' | 'timestamp'> }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'CLEAR_CHAT' }
  | { type: 'LOAD_MESSAGES'; payload: Message[] };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ],
        context: [...state.context, action.payload.content].slice(-10), // Keep last 10 messages for context
      };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'CLEAR_CHAT':
      return { messages: [], isTyping: false, context: [] };
    case 'LOAD_MESSAGES':
      return {
        ...state,
        messages: action.payload,
        context: action.payload.map(msg => msg.content).slice(-10),
      };
    default:
      return state;
  }
};

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  context: [],
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const setTyping = (isTyping: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: isTyping });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const loadMessages = (messages: Message[]) => {
    dispatch({ type: 'LOAD_MESSAGES', payload: messages });
  };

  return (
    <ChatContext.Provider value={{ state, addMessage, setTyping, clearChat, loadMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};