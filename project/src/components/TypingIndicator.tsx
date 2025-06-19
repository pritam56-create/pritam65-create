import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const TypingIndicator: React.FC = () => {
  const { settings } = useSettings();

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  return (
    <motion.div
      className="flex gap-3 mb-6 justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${personalityColors[settings.personality]} flex items-center justify-center shadow-lg`}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Bot className="w-4 h-4 text-white" />
      </motion.div>

      <div className={`max-w-[80%] p-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm ${
        settings.theme === 'dark'
          ? 'bg-gray-800/80 text-white border border-gray-700/50'
          : 'bg-white/80 text-gray-900 border border-gray-200/50'
      }`}>
        <div className="flex items-center space-x-2">
          <span className="text-sm opacity-70">AI is thinking</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  settings.theme === 'dark' ? 'bg-white' : 'bg-gray-600'
                }`}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};