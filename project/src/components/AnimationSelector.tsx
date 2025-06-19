import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { AnimationMode } from '../types';

export const AnimationSelector: React.FC = () => {
  const { settings, updateAnimationMode } = useSettings();

  const animationModes: { mode: AnimationMode; name: string; icon: string; description: string }[] = [
    { mode: 'particles', name: 'Particles', icon: '✨', description: 'Floating particles' },
    { mode: 'waves', name: 'Waves', icon: '🌊', description: 'Flowing waves' },
    { mode: 'geometric', name: 'Geometric', icon: '🔷', description: 'Geometric shapes' },
    { mode: 'minimal', name: 'Minimal', icon: '⚪', description: 'Simple dots' },
    { mode: 'cosmic', name: 'Cosmic', icon: '🌌', description: 'Space theme' },
  ];

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${
        settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Background Animation
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {animationModes.map((animation) => (
          <motion.button
            key={animation.mode}
            onClick={() => updateAnimationMode(animation.mode)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              settings.animationMode === animation.mode
                ? settings.theme === 'dark'
                  ? 'border-violet-500 bg-violet-900/20'
                  : 'border-blue-500 bg-blue-50'
                : settings.theme === 'dark'
                  ? 'border-gray-700 hover:border-gray-600'
                  : 'border-gray-200 hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-2">{animation.icon}</div>
            <div className={`font-medium text-sm ${
              settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {animation.name}
            </div>
            <div className={`text-xs ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {animation.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};