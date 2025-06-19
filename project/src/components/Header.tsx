import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Settings, 
  Sun, 
  Moon, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Sparkles,
  Heart,
  Zap,
  Coffee,
  Save
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useChat } from '../context/ChatContext';
import { WindowControls } from './WindowControls';
import { PersonalityMode } from '../types';

export const Header: React.FC = () => {
  const { settings, updateTheme, updatePersonality, toggleVoice, toggleSound } = useSettings();
  const { state } = useChat();
  const [showSettings, setShowSettings] = useState(false);

  const personalityIcons = {
    professional: Bot,
    casual: Coffee, 
    motivational: Zap,
    funny: Heart,
  };

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  const PersonalityIcon = personalityIcons[settings.personality];

  const handleSaveConversation = async () => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      const conversationData = {
        messages: state.messages,
        timestamp: new Date().toISOString(),
        settings: settings
      };
      
      const result = await window.electronAPI.saveConversation(conversationData);
      if (result.success) {
        // Show success notification
        console.log('Conversation saved successfully');
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 ${
        settings.theme === 'dark' 
          ? 'bg-gray-900/80 text-white' 
          : 'bg-white/80 text-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Window Controls (Desktop only) */}
          <div style={{ WebkitAppRegion: 'no-drag' } as any}>
            <WindowControls />
          </div>

          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ WebkitAppRegion: 'no-drag' } as any}
          >
            <div className={`p-2 rounded-xl bg-gradient-to-r ${personalityColors[settings.personality]} shadow-lg`}>
              <PersonalityIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-xs opacity-70 capitalize">{settings.personality} Mode</p>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center space-x-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
            {/* Save Conversation (Desktop only) */}
            {typeof window !== 'undefined' && window.electronAPI && (
              <motion.button
                onClick={handleSaveConversation}
                className={`p-2 rounded-lg transition-colors ${
                  settings.theme === 'dark' 
                    ? 'bg-gray-800 text-gray-400 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Save Conversation"
              >
                <Save className="w-4 h-4" />
              </motion.button>
            )}

            {/* Voice Toggle */}
            <motion.button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                settings.voiceEnabled 
                  ? 'bg-green-500/20 text-green-400' 
                  : settings.theme === 'dark' 
                    ? 'bg-gray-800 text-gray-400 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {settings.voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </motion.button>

            {/* Sound Toggle */}
            <motion.button
              onClick={toggleSound}
              className={`p-2 rounded-lg transition-colors ${
                settings.soundEnabled 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : settings.theme === 'dark' 
                    ? 'bg-gray-800 text-gray-400 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => updateTheme(settings.theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                settings.theme === 'dark' 
                  ? 'bg-gray-800 text-yellow-400 hover:text-yellow-300' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Settings Toggle */}
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                showSettings 
                  ? 'bg-violet-500/20 text-violet-400' 
                  : settings.theme === 'dark' 
                    ? 'bg-gray-800 text-gray-400 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className={`border-t border-white/10 py-4 ${
                settings.theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/50'
              }`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ WebkitAppRegion: 'no-drag' } as any}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personality Mode:</span>
                <div className="flex space-x-2">
                  {(Object.keys(personalityIcons) as PersonalityMode[]).map((mode) => {
                    const Icon = personalityIcons[mode];
                    return (
                      <motion.button
                        key={mode}
                        onClick={() => updatePersonality(mode)}
                        className={`p-2 rounded-lg capitalize text-xs transition-all ${
                          settings.personality === mode
                            ? `bg-gradient-to-r ${personalityColors[mode]} text-white shadow-lg`
                            : settings.theme === 'dark'
                              ? 'bg-gray-800 text-gray-400 hover:text-white'
                              : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4 mx-1" />
                        <span className="ml-1">{mode}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};