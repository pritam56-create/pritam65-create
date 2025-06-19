import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatHistory, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';

interface ChatHistoryContextType {
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  createNewChat: () => string;
  saveCurrentChat: (messages: Message[]) => void;
  loadChat: (chatId: string) => ChatHistory | null;
  deleteChat: (chatId: string) => void;
  getCurrentChat: () => ChatHistory | null;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'ai_assistant_chats_';

export const ChatHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.user && !authState.user.isGuest) {
      loadChatHistories();
    } else if (authState.user?.isGuest) {
      // For guest users, start with empty history
      setChatHistories([]);
      setCurrentChatId(null);
    }
  }, [authState.user]);

  const getStorageKey = () => {
    return `${STORAGE_KEY_PREFIX}${authState.user?.id || 'guest'}`;
  };

  const loadChatHistories = () => {
    if (!authState.user) return;

    const storageKey = getStorageKey();
    const savedChats = localStorage.getItem(storageKey);
    
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setChatHistories(parsedChats);
      } catch (error) {
        console.error('Error loading chat histories:', error);
      }
    }
  };

  const saveChatHistories = (histories: ChatHistory[]) => {
    if (!authState.user || authState.user.isGuest) return;

    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(histories));
  };

  const createNewChat = (): string => {
    const newChatId = uuidv4();
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedHistories = [newChat, ...chatHistories];
    setChatHistories(updatedHistories);
    setCurrentChatId(newChatId);
    saveChatHistories(updatedHistories);

    return newChatId;
  };

  const saveCurrentChat = (messages: Message[]) => {
    if (!currentChatId || messages.length === 0) return;

    const updatedHistories = chatHistories.map(chat => {
      if (chat.id === currentChatId) {
        const title = messages.length > 0 
          ? messages[0].content.substring(0, 50) + (messages[0].content.length > 50 ? '...' : '')
          : 'New Conversation';

        return {
          ...chat,
          title,
          messages,
          updatedAt: new Date(),
        };
      }
      return chat;
    });

    setChatHistories(updatedHistories);
    saveChatHistories(updatedHistories);
  };

  const loadChat = (chatId: string): ChatHistory | null => {
    const chat = chatHistories.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      return chat;
    }
    return null;
  };

  const deleteChat = (chatId: string) => {
    const updatedHistories = chatHistories.filter(chat => chat.id !== chatId);
    setChatHistories(updatedHistories);
    saveChatHistories(updatedHistories);

    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const getCurrentChat = (): ChatHistory | null => {
    if (!currentChatId) return null;
    return chatHistories.find(chat => chat.id === currentChatId) || null;
  };

  return (
    <ChatHistoryContext.Provider value={{
      chatHistories,
      currentChatId,
      createNewChat,
      saveCurrentChat,
      loadChat,
      deleteChat,
      getCurrentChat,
    }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
};