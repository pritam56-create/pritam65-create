import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Square, Paperclip, Smile, Upload, Palette } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onToggleFileUpload: () => void;
  onToggleAnimationSelector: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onToggleFileUpload,
  onToggleAnimationSelector,
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { settings } = useSettings();

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    if (settings.voiceEnabled) {
      setIsRecording(!isRecording);
      // Voice recording logic would go here
    }
  };

  const quickResponses = [
    "How can you help me?",
    "Write code for me",
    "Explain this concept",
    "Give me advice",
  ];

  return (
    <div className="relative">
      {/* Quick Response Suggestions */}
      <AnimatePresence>
        {message === '' && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-4 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <motion.button
                  key={response}
                  onClick={() => setMessage(response)}
                  className={`px-3 py-2 text-sm rounded-full border transition-all ${
                    settings.theme === 'dark'
                      ? 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {response}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input */}
      <motion.form
        onSubmit={handleSubmit}
        className={`backdrop-blur-xl rounded-2xl shadow-2xl border ${
          settings.theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700'
            : 'bg-white/80 border-gray-200'
        }`}
        layout
      >
        <div className="flex items-end p-4 gap-3">
          {/* File Upload Button */}
          <motion.button
            type="button"
            onClick={onToggleFileUpload}
            className={`p-2 rounded-lg transition-colors ${
              settings.theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Upload PDF file"
          >
            <Upload className="w-5 h-5" />
          </motion.button>

          {/* Animation Selector Button */}
          <motion.button
            type="button"
            onClick={onToggleAnimationSelector}
            className={`p-2 rounded-lg transition-colors ${
              settings.theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Choose animation style"
          >
            <Palette className="w-5 h-5" />
          </motion.button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={disabled}
              className={`w-full resize-none bg-transparent border-none outline-none placeholder-gray-400 min-h-[24px] max-h-32 ${
                settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              rows={1}
            />
            
            {/* Emoji Button */}
            <motion.button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
                settings.theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smile className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Voice Recording Button */}
          {settings.voiceEnabled && (
            <motion.button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-lg transition-all ${
                isRecording
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : settings.theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
              transition={isRecording ? { duration: 1, repeat: Infinity } : {}}
            >
              {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
          )}

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`p-2 rounded-lg transition-all ${
              message.trim() && !disabled
                ? `bg-gradient-to-r ${personalityColors[settings.personality]} text-white shadow-lg hover:shadow-xl`
                : settings.theme === 'dark'
                  ? 'bg-gray-800 text-gray-500'
                  : 'bg-gray-100 text-gray-400'
            }`}
            whileHover={message.trim() && !disabled ? { scale: 1.1 } : {}}
            whileTap={message.trim() && !disabled ? { scale: 0.95 } : {}}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};