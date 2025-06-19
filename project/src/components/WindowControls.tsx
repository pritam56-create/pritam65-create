import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

declare global {
  interface Window {
    electronAPI?: {
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
      isElectron: boolean;
    };
  }
}

export const WindowControls: React.FC = () => {
  const { settings } = useSettings();

  // Only show on desktop platforms
  if (typeof window === 'undefined' || !window.electronAPI?.isElectron) {
    return null;
  }

  const handleMinimize = () => {
    window.electronAPI?.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI?.maximizeWindow();
  };

  const handleClose = () => {
    window.electronAPI?.closeWindow();
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={handleMinimize}
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
          settings.theme === 'dark'
            ? 'bg-yellow-500 hover:bg-yellow-400'
            : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Minus className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100" />
      </motion.button>

      <motion.button
        onClick={handleMaximize}
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
          settings.theme === 'dark'
            ? 'bg-green-500 hover:bg-green-400'
            : 'bg-green-400 hover:bg-green-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Square className="w-2 h-2 text-green-900 opacity-0 hover:opacity-100" />
      </motion.button>

      <motion.button
        onClick={handleClose}
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
          settings.theme === 'dark'
            ? 'bg-red-500 hover:bg-red-400'
            : 'bg-red-400 hover:bg-red-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100" />
      </motion.button>
    </div>
  );
};