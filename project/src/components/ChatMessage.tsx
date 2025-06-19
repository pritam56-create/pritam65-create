import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message } from '../types';
import { useSettings } from '../context/SettingsContext';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const { settings } = useSettings();
  const isUser = message.sender === 'user';

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderMessageContent = (content: string) => {
    // Check if message contains code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    // If no code blocks found, return as text
    if (parts.length === 0) {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }

    return (
      <div className="space-y-4">
        {parts.map((part, index) => (
          <div key={index}>
            {part.type === 'text' ? (
              <div className="whitespace-pre-wrap">{part.content}</div>
            ) : (
              <CodeBlock code={part.content} language={part.language} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {!isUser && (
        <motion.div
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${personalityColors[settings.personality]} flex items-center justify-center shadow-lg`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Bot className="w-4 h-4 text-white" />
        </motion.div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <motion.div
          className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
            isUser
              ? `bg-gradient-to-r ${personalityColors[settings.personality]} text-white`
              : settings.theme === 'dark'
                ? 'bg-gray-800/80 text-white border border-gray-700/50'
                : 'bg-white/80 text-gray-900 border border-gray-200/50'
          } ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-sm leading-relaxed">
            {renderMessageContent(message.content)}
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <div className="text-xs opacity-60">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            
            {!isUser && (
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => copyToClipboard(message.content)}
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Copy message"
                >
                  <Copy className="w-3 h-3" />
                </motion.button>
                <motion.button
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Like message"
                >
                  <ThumbsUp className="w-3 h-3" />
                </motion.button>
                <motion.button
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Dislike message"
                >
                  <ThumbsDown className="w-3 h-3" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {isUser && (
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <User className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};