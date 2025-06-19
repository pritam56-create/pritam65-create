import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider, useChat } from './context/ChatContext';
import { ChatHistoryProvider, useChatHistory } from './context/ChatHistoryContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { ChatSidebar } from './components/ChatSidebar';
import { DynamicBackground } from './components/DynamicBackground';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { FileUpload } from './components/FileUpload';
import { AnimationSelector } from './components/AnimationSelector';
import { generateAIResponse } from './utils/aiService';
import { Menu } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { state, addMessage, setTyping, loadMessages, clearChat } = useChat();
  const { settings } = useSettings();
  const { createNewChat, saveCurrentChat, loadChat, currentChatId } = useChatHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showAnimationSelector, setShowAnimationSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.isTyping]);

  // Save chat whenever messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      saveCurrentChat(state.messages);
    }
  }, [state.messages, saveCurrentChat]);

  const handleSendMessage = async (content: string) => {
    // Create new chat if none exists
    if (!currentChatId) {
      createNewChat();
    }

    // Add user message
    addMessage({ content, sender: 'user' });
    
    // Show typing indicator
    setTyping(true);
    
    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content, settings.personality, state.context);
      
      // Check if response contains code
      const hasCode = aiResponse.includes('```') || aiResponse.includes('function') || aiResponse.includes('class ') || aiResponse.includes('def ');
      
      // Add AI response
      addMessage({ 
        content: aiResponse, 
        sender: 'assistant',
        hasCode 
      });
    } catch (error) {
      addMessage({ 
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.", 
        sender: 'assistant' 
      });
    } finally {
      setTyping(false);
    }
  };

  const handleQuickStart = (message: string) => {
    handleSendMessage(message);
  };

  const handleNewChat = () => {
    createNewChat();
    clearChat();
    setSidebarOpen(false);
  };

  const handleLoadChat = (chatId: string) => {
    const chat = loadChat(chatId);
    if (chat) {
      loadMessages(chat.messages);
    }
    setSidebarOpen(false);
  };

  const handleFileUpload = (file: File, content: string) => {
    const message = `I've uploaded a PDF file: "${file.name}". Please analyze this document and provide detailed insights about its content, key points, and any important information it contains.

File Details:
- Name: ${file.name}
- Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
- Type: PDF Document

Please provide a comprehensive analysis of this document.`;

    handleSendMessage(message);
    setShowFileUpload(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      settings.theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100'
    }`}>
      <DynamicBackground />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <ChatSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
          onLoadChat={handleLoadChat}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={`fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden ${
              settings.theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            } shadow-lg`}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <main className="flex-1 flex flex-col pt-16">
            {state.messages.length === 0 ? (
              <WelcomeScreen onQuickStart={handleQuickStart} />
            ) : (
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="max-w-4xl mx-auto">
                  <AnimatePresence mode="popLayout">
                    {state.messages.map((message, index) => (
                      <ChatMessage key={message.id} message={message} index={index} />
                    ))}
                    
                    {state.isTyping && (
                      <motion.div key="typing">
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
            
            <motion.div 
              className="sticky bottom-0 p-4 backdrop-blur-xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="max-w-4xl mx-auto space-y-4">
                {/* File Upload */}
                <AnimatePresence>
                  {showFileUpload && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FileUpload 
                        onFileUpload={handleFileUpload}
                        disabled={state.isTyping}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animation Selector */}
                <AnimatePresence>
                  {showAnimationSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 rounded-2xl backdrop-blur-xl border ${
                        settings.theme === 'dark'
                          ? 'bg-gray-900/80 border-gray-700'
                          : 'bg-white/80 border-gray-200'
                      }`}
                    >
                      <AnimationSelector />
                    </motion.div>
                  )}
                </AnimatePresence>

                <ChatInput 
                  onSendMessage={handleSendMessage} 
                  disabled={state.isTyping}
                  onToggleFileUpload={() => setShowFileUpload(!showFileUpload)}
                  onToggleAnimationSelector={() => setShowAnimationSelector(!showAnimationSelector)}
                />
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <ChatHistoryProvider>
      <ChatProvider>
        <ChatInterface />
      </ChatProvider>
    </ChatHistoryProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;